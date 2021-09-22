var db=require('../../config/config');
var initModels=require('../models/database/init-models');
var models=initModels(db)
const APIError = require('../errors/api-error');
const httpStatus = require('http-status');


async function createDetails(name,Data){
    try{
        if(Data!=null){
            Data.CreatedOn=new Date(),
            Data.CreatedBy=name
            Data.ApprovalStatus="Pending"
            Data.Role="GSO-1"
            return Data
        }else{
            return false;
        }
    }catch(error){
        return false;
    }
}
async function modifiedDetails(name,Data){
    try{
        if(Data!=null){
            Data.ModifiedOn=new Date(),
            Data.ModifiedBy=name
            return Data
        }else{
            return false;
        }
    }catch(error){
        return false;
    }
}


exports.create = async (Data,username) => {
    try {
      await db.authenticate();  
      var Data=await createDetails(username,Data)
      await models.employee.create(Data,{
        include:[{
            model:models.employeequalification,
            as:"employeequalifications"
        },{
            model:models.employeeexperience,
             as:"employeeexperiences"
        },{
            model:models.employeepaypakage ,
             as:"employeepaypakages"
        },{
            model:models.employeeremarks,
            as:"employeeremarks"
        }]
      });
      return{
        response:true  
      } 
    } catch (error) {
        return {
            response:false,
            error:new APIError(httpStatus.INTERNAL_SERVER_ERROR)
        }
    }
  };

 exports.update=async(Data,username)=>{
    try{
        await db.authenticate();
        var result=await models.employee.findOne({where:{EmployeeID:Data.EmployeeID}})
        if(result!=null){
            await models.employeeexperience.destroy({
                    where:{EmployeeID:Data.EmployeeID}
                })
                await models.employeepaypakage.destroy({
                    where:{EmployeeID:Data.EmployeeID}
                })
                await models.employeequalification.destroy({
                    where:{EmployeeID:Data.EmployeeID}
                })
                for(var i=0;i<Data.employeeexperiences.length;i++){
                    Data.employeeexperiences[i].EmployeeID=Data.EmployeeID
                    await models.employeeexperience.create(Data.employeeexperiences[i])
        
                }
        
                for(var i=0;i<Data.employeepaypakages.length;i++){
                    Data.employeepaypakages[i].EmployeeID=Data.EmployeeID
                    await models.employeepaypakage.create(Data.employeepaypakages[i])
        
                }
        
                for(var i=0;i<Data.employeequalifications.length;i++){
                    Data.employeequalifications[i].EmployeeID=Data.EmployeeID
                    await models.employeequalification.create(Data.employeequalifications[i])
        
                }
        
                for(var i=0;i<Data.employeeremarks.length;i++){
                    if(Data.employeeremarks[i].EmployeeID==undefined){
                        Data.employeeremarks[i].EmployeeID=Data.EmployeeID
                        await models.employeeremarks.create(Data.employeeremarks[i])
                    }
                    }
                var obj=await modifiedDetails(username,Data)    
                await models.employee.update(obj,{where :{EmployeeID:Data.EmployeeID}})
                return {response:true} 
        }else{
                return {resposne:false,error:new APIError({
                    message:"NOT FOUND",
                    status:httpStatus.NOT_FOUND
                })}
        }
        
    }catch(error){
        return {resposne:false,error:new APIError(httpStatus.INTERNAL_SERVER_ERROR)}
        
    }
 };

 exports.delete=async(id,Data,username)=>{
    try{
        await db.authenticate()
            var check=await models.employee.findOne({where:{EmployeeID:id}})
            if(check!=null){
                for(var i=0;i<Data.employeeremarks.length;i++){
                    if(Data.employeeremarks[i].EmployeeID==undefined){
                        Data.employeeremarks[i].EmployeeID=Data.EmployeeID
                        await models.employeeremarks.create(Data.employeeremarks[i])
                    }
                    }
                var result=await models.employee.update(
                    {DeletedBy:username,DeletedOn:new Date(),Delete:true},
                    {where :{
                    EmployeeID:id}
                }
                )
                if(result!=0){
                    return {
                        response:true,
                        code:httpStatus.OK,
                        message:"Data Deleted"
                    }    
                }else{
                    return{
                        response:true,
                        code:httpStatus.OK,
                        message:"No Change"
                    }
            }
            }else{
                return {resposne:false,error:new APIError({
                    message:"NOT FOUND",
                    status:httpStatus.NOT_FOUND
                })}
            }
    }catch(error){
        return {resposne:false,error:new APIError(httpStatus.INTERNAL_SERVER_ERROR)}

    }
}

exports.approve=async(Data,username)=>{
    try{
        await db.authenticate();
        var check=await models.employee.findOne({where:{EmployeeID:Data.EmployeeID}})
        if(check==null){return {resposne:false,error:new APIError(httpStatus.NOT_FOUND)}}
        for(var i=0;i<Data.employeeremarks.length;i++){
            if(Data.employeeremarks[i].EmployeeID==undefined){
                Data.employeeremarks[i].EmployeeID=Data.EmployeeID
                await models.employeeremarks.create(Data.employeeremarks[i])
            }
            }
       
        var obj=await modifiedDetails(username,Data)    
        await models.employee.update(
            {ApprovalStatus:"Approved",Role:"GSO-2"},
            {where :{
                EmployeeID:Data.EmployeeID
            },
        }
        )
            return {response:true}
    }catch(error){
        return {resposne:false,error:new APIError(httpStatus.INTERNAL_SERVER_ERROR)}
    }
}

exports.id=async(id)=>{
    try{
        await db.authenticate();
        var result=await models.employee.findOne({
            where:{EmployeeID:id},
            include:[{
                model:models.employeequalification,
                as:"employeequalifications"
            },{
                model:models.employeeexperience,
                 as:"employeeexperiences"
            },{
                model:models.employeepaypakage ,
                 as:"employeepaypakages"
            },{
                model:models.employeeremarks,
                as:"employeeremarks"
            }]
        })
        if(result==null){return {resposne:false,error:new APIError({
                    message:"NOT FOUND",
                    status:httpStatus.NOT_FOUND})
                }    
        }     
        return {
            response:true,
            data:result
        }
    }catch(error){
        return {response:false,error:new APIError(httpStatus.INTERNAL_SERVER_ERROR)}
    }
}
exports.active=async()=>{
    try{
        await db.authenticate();
        var result=await models.employee.findAll({
            where:{Delete:false},
            include:[{
                model:models.employeequalification,
                as:"employeequalifications"
            },{
                model:models.employeeexperience,
                 as:"employeeexperiences"
            },{
                model:models.employeepaypakage ,
                 as:"employeepaypakages"
            },{
                model:models.employeeremarks,
                as:"employeeremarks"
            },{
                model:models.appointment,
                as:"Appointment"
            }]
        })
        if(result!==null){
            return {
                response:true,
                data:result
            }    
        }else{
            return {resposne:false,error:new APIError(httpStatus.NOT_FOUND)}
        }
    }catch(error){
        return {resposne:false,error:new APIError(httpStatus.INTERNAL_SERVER_ERROR)}
    }
}