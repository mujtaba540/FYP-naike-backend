var db=require('../../config/config.js');
var initModels=require('../models/database/init-models');
var models=initModels(db)
const APIError = require('../errors/api-error');
const httpStatus = require('http-status');

module.exports={
 async roles(){
   try{
    await db.authenticate();
    var Roles=await models.role.findAll({attributes:["Name"]})
    return Roles
   }catch(error){
    return apiError = new APIError({
      message: error ? error.message : 'Unauthorized',
      status: httpStatus.INTERNAL_SERVER_ERROR,
      stack: error ? error.stack : undefined,
    })   }
 },

 async findByUserName(username){
  try{
    await db.authenticate();
    var user=await models.UserDetails.findOne({where:{email:username},attributes:["email"],
  include:[{
    model:models.Role,
    as:"role",
    attributes:["roleName"]
  }]})
    return user
   }catch(error){
    return apiError = new APIError({
      message: 'Unauthorized',
      status: httpStatus.UNAUTHORIZED,
      stack: error ? error.stack : undefined,
    })
   }
 }

 }