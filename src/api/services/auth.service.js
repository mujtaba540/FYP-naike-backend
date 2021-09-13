var db=require('../../config/config.js');
var initModels=require('../models/database/init-models');
var models=initModels(db)
const httpStatus = require('http-status');
const APIError = require('../errors/api-error');
const bcrypt = require('bcryptjs');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
const moment = require('moment-timezone');
const jwt = require('jsonwebtoken')


async function passwordMatches(Password,hashed) {
  return bcrypt.compare(Password,hashed);
}

async function token(rolename,username) {
  const payload = {
    exp: moment().add(jwtExpirationInterval, 'm').unix(),
    iat: moment().unix(),
    RoleName:rolename,
    UserName:username
  };
  var access_token=jwt.sign(payload, jwtSecret);
  return {
    access_token:access_token,
    exp: moment().add(jwtExpirationInterval, 'minutes').unix(),
    iat: moment().unix(),
  }
}
var round=10
module.exports={
  

    async findAndGenerateToken(options){
    const { email, password} = options;
    if (!email) throw new APIError({ message: 'An email is required to generate a token' });
    await db.authenticate()
    var user = await models.UserDetails.findOne({ where:{email:email },
        attributes:["password"],
    })
    const err = {
      status: httpStatus.UNAUTHORIZED,
      isPublic: true,
    };
    
    if (password) {
      if (user!=null&&await passwordMatches(password,user.password)) {
        user=await models.UserDetails.findOne({
            where:{
                email:email
            },
            include:[
                {
                    model:models.Role,
                    include:[{
                        model:models.rolePrevilege,
                        as:"rolePrevileges",
                        attributes:["view","edit","add","isActive"],
                        include:[{
                            model:models.Privilege,
                            as:"privilege",
                            attributes:["menuName","subMenuName","isActive"]
                        }]
                    }
                    ],
                    as:"role",
                    attributes:["roleID","roleName"]
                }
            ]
        })
        var accessToken=await token(user.role.roleName,user.email)
        return { user, accessToken: accessToken };
      }
      err.message = 'Incorrect email or password';
    } 
    throw new APIError(err);
    },

    async register(data){
      try{
        await db.authenticate();
        data.roleID=10
        data.password=await bcrypt.hash(data.password,round)
        await models.UserDetails.create(data)
        return {
          response:true
        }
      }catch(error){
        return{
          response:false,
          error:new APIError(httpStatus.INTERNAL_SERVER_ERROR)
        }
      }
    }
}