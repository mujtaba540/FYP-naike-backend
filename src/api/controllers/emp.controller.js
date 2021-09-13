const httpStatus = require('http-status');
const { omit } = require('lodash');
const employee = require('../services/emp.service');
const APIError = require('../errors/api-error');



/**
 * Create new user
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    var username=req.username 
    var {Data} = req.body;
    if(Data==undefined)return next(new APIError({
      status:httpStatus.BAD_REQUEST,
      message:"BAD REQUEST"
    }))
    Data=JSON.parse(Data)
    var Remarks={
        Remarks:Data.Remarks,
        CreatedOn:new Date(),
        CreatedBy:username
    }
    Data.Delete=false
    Data.PhotoPath=req.file.path.replace(/\\/g, "/")
    Data.employeeremarks.push(Remarks)
    var result=await employee.create(Data,username);
    if(result.response){

        res.status(httpStatus.CREATED);
        res.json({
            code:httpStatus.OK,
            "message":"Success"
        })
    }else{
        throw result.error
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
        var {Data} = req.body;
        if(Data==undefined)return next(new APIError({
          status:httpStatus.BAD_REQUEST,
          message:"BAD REQUEST"
        }))
        var username=req.username 
        Data=JSON.parse(Data)
        Data.EmployeeID=req.params.id
        var Remarks={
            Remarks:Data.Remarks,
            CreatedOn:new Date(),
            CreatedBy:username
        }
        Data.employeeremarks.push(Remarks)
            var result=await employee.update(Data,username)
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
    var {Data}=req.body
    if(Data==undefined)return next(new APIError({
      status:httpStatus.BAD_REQUEST,
      message:"BAD REQUEST"
    }))
        Data=JSON.parse(Data)
        var username=req.username
        var Remarks={
            Remarks:Data.Remarks,
            CreatedOn:new Date(),
            CreatedBy:username
        }
        var id=req.params.id
        console.log(id)
        Data.employeeremarks.push(Remarks)
            var result=await employee.delete(id,Data,username)
            if(result.response){
                res.status(result.code).json({
                   code:result.code,
                    message:result.message
                })
            }else{
              return next(result.error)

            }
}catch(error){
  return next(error)
}
};

exports.approve = async (req, res, next) => {
  try{
    var {Data}=req.body
    if(Data==undefined)return next(new APIError({
      status:httpStatus.BAD_REQUEST,
      message:"BAD REQUEST"
    }))
        Data=JSON.parse(Data)
        var username=req.username
        Data.EmployeeID=req.params.id
        var Remarks={
            Remarks:Data.Remarks,
            CreatedOn:new Date(),
            CreatedBy:username
        }
        
        Data.employeeremarks.push(Remarks)
        var result=await employee.approve(Data,username)
        if(result.response){
            res.status(httpStatus.OK)
            res.json({
              code:httpStatus.OK,
              message:"Data Approved"
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
      var result=await employee.active()
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
    var result=await employee.id(id)
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