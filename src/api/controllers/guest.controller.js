const httpStatus = require('http-status');
const donation = require('../services/donation.service');
const need = require('../services/need.service');
const APIError = require('../errors/api-error');




exports.donation_all = async(req,res,next)=>{
    try{
        var result=await donation.all_guest()
        if(result.response){
            res.status(httpStatus.OK).json({
                Status:{code:httpStatus.OK,
                message:"Success"},
                Data:{data:result.data}
            })
        }else{
          return next(result.error)
        }
  }catch(error){
    return next(error)
  }
  },
  
  exports.donation_id=async(req,res,next)=>{
    try{
      var id=req.params.id
      var result=await donation.id_guest(id)
      if(result.response){
          res.status(httpStatus.OK).json({
              Status:{code:httpStatus.OK,
              message:"Success"},
              Data:{data:result.data}
          })
      }else{
        return next(result.error)
      }
  }catch(error){
  return next(error)
  }
  }
  
  exports.donation_count = async(req,res,next)=>{
      try{
          var result=await donation.count()
          if(result.response){
              res.status(httpStatus.OK).json({
                  Status:{code:httpStatus.OK,
                  message:"Success"},
                  Data:{data:{count:result.data}}
              })
          }else{
            return next(result.error)
          }
    }catch(error){
      return next(error)
    }
}
exports.need_all = async(req,res,next)=>{
    try{
        var result=await need.all_guest()
        if(result.response){
            res.status(httpStatus.OK).json({
                Status:{code:httpStatus.OK,
                message:"Success"},
                Data:{data:result.data}
            })
        }else{
          return next(result.error)
        }
  }catch(error){
    return next(error)
  }
  },
  
  exports.need_id=async(req,res,next)=>{
    try{
      var id=req.params.id
      var result=await need.id_guest(id)
      if(result.response){
          res.status(httpStatus.OK).json({
              Status:{code:httpStatus.OK,
              message:"Success"},
              Data:{data:result.data}
          })
      }else{
        return next(result.error)
      }
  }catch(error){
  return next(error)
  }
  }
  
  exports.need_count = async(req,res,next)=>{
      try{
          var result=await need.count()
          if(result.response){
              res.status(httpStatus.OK).json({
                  Status:{code:httpStatus.OK,
                  message:"Success"},
                  Data:{data:{count:result.data}}
              })
          }else{
            return next(result.error)
          }
    }catch(error){
      return next(error)
    }
    }