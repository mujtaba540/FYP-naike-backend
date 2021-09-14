const httpStatus = require('http-status');
const subcategory = require('../services/subcategory.service');
const APIError = require('../errors/api-error');




exports.create = async (req, res, next) => {
  try {
    var Data = req.body;
    if(Data==undefined)return next(new APIError({
      status:httpStatus.BAD_REQUEST,
      message:"BAD REQUEST"
    }))
    var result=await subcategory.create(Data);
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

exports.update = async (req, res, next) =>{
    try{
        var Data = req.body;
        if(Data==undefined)return next(new APIError({
          status:httpStatus.BAD_REQUEST,
          message:"BAD REQUEST"
        }))
        Data.subcategoryID=req.params.id
            var result=await subcategory.update(Data)
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

exports.list = async (req, res, next) => {
  try {
    const users = await User.list(req.query);
    const transformedUsers = users.map((user) => user.transform());
    res.json(transformedUsers);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try{
      var username=req.username
        var id=req.params.id
            var result=await subcategory.delete(id,username)
            if(result.response){
                res.status(httpStatus.OK).json({
                   code:httpStatus.OK,
                    message:"subcategory Deleted"
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
      var result=await subcategory.all()
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
    var result=await subcategory.id(id)
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

exports.count = async(req,res,next)=>{
    try{
        var result=await subcategory.count()
        if(result.response){
            res.status(httpStatus.OK).json({
                code:httpStatus.OK,
                message:"Success",
                data:{count:result.data}
            })
        }else{
          return next(result.error)
        }
  }catch(error){
    return next(error)
  }
  }
  exports.all_guest = async(req,res,next)=>{
    try{
        var result=await subcategory.all_guest()
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
  
  exports.id_guest=async(req,res,next)=>{
    try{
      var id=req.params.id
      var result=await subcategory.id_guest(id)
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

