const httpStatus = require('http-status');
const privilege = require('../services/privilege.service');
const APIError = require('../errors/api-error');



/**
 * Create new user
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    var Data = req.body;
    Data.Active=true
    if(Data==undefined)return next(new APIError({
      status:httpStatus.BAD_REQUEST,
      message:"BAD REQUEST"
    }))
    var result=await privilege.create(Data);
    if(result.response){
        res.status(httpStatus.CREATED);
        res.json({
            code:httpStatus.OK,
            "message":"Success"
        })
    }else{
        return next(result.error)
    }
    
} catch (error) {
    return next(error)
       
  }
};

/**
 * Update existing user
 * @public
 */
exports.update = async (req, res, next) =>{
    try{
        var Data = req.body;
        var username=req.username
        if(Data==undefined)return next(new APIError({
          status:httpStatus.BAD_REQUEST,
          message:"BAD REQUEST"
        }))
        Data.PrivilegeID=req.params.id
            var result=await privilege.update(Data,username)
            if(result.response){
                res.status(httpStatus.OK);
                res.json({
                    "code":"200",
                    "message":"Success"
                })
            }else{
              return next(result.error)
            }
    }catch(error){
       return next(error)
    }
};

/**
 * Get user list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const users = await User.list(req.query);
    const transformedUsers = users.map((user) => user.transform());
    res.json(transformedUsers);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete user
 * @public
 */
exports.delete = async (req, res, next) => {
  try{
      var username=req.username
        var id=req.params.id
            var result=await privilege.delete(id,username)
            if(result.response){
                res.status(httpStatus.OK).json({
                   code:httpStatus.OK,
                    message:"Privilege Deleted"
                })
            }else{
              return next(result.error)

            }
}catch(error){
  return next(error)
}
};


exports.all = async(req,res,next)=>{
  try{
      var result=await privilege.active()
      if(result.response){
          res.status(httpStatus.OK).json({
              code:httpStatus.OK,
              message:"Success",
              data:result.data
          })
      }else{
        return next(result.error)
      }
}catch(error){
  return next(error)
}
},

exports.id=async(req,res,next)=>{
  try{
    var id=req.params.id
    var result=await privilege.id(id)
    if(result.response){
        res.status(httpStatus.OK).json({
            code:httpStatus.OK,
            message:"Success",
            data:result.data
        })
    }else{
      return next(result.error)
    }
}catch(error){
return next(error)
}
}