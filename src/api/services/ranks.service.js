var db=require('../../config/config');
var initModels=require('../models/Database/init-models');
var models=initModels(db)
const APIError = require('../errors/api-error');
const httpStatus = require('http-status');


async function createDetails(name,Data){
    try{
        if(Data!=null){
            Data.CreatedOn=new Date(),
            Data.CreatedBy=name
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
        await db.authenticate()
        var obj=await createDetails(username,Data)
        await models.ranks.create(obj)
        return {
            response:true
        }
    } catch (error) {
        console.log(error.message)
        return {
            response:false,
            error:new APIError(httpStatus.INTERNAL_SERVER_ERROR)
        }
    }
  };

 exports.update=async(Data,username)=>{
    try{
        await db.authenticate();
        var result=await models.ranks.findOne({where:{RanksID:Data.RanksID}})
        if(result==null){
            return {resposne:false,error:new APIError({
                message:"NOT FOUND",
                status:httpStatus.NOT_FOUND
            })}
        }else{
            var obj=await modifiedDetails(username,Data)    
            await models.ranks.update(obj,{where :{RanksID:Data.RanksID}})
            return {response:true}  
        }
        
    }catch(error){
        return {resposne:false,error:new APIError(httpStatus.INTERNAL_SERVER_ERROR)}
        
    }
 };

 exports.delete=async(id,username)=>{
    try{
        await db.authenticate()
            var check=await models.ranks.findOne({where:{RanksID:id}})
            if(check==null){
                return {resposne:false,error:new APIError({
                    message:"NOT FOUND",
                    status:httpStatus.NOT_FOUND
                })}
            }else{
               await models.ranks.update({DeletedBy:username,DeletedOn:new Date(),Active:false},
               {where :{
               RanksID:id,
               Active:true}
           })
               return {response:true}
           
            }
    }catch(error){
        return {response:false,error:new APIError(httpStatus.INTERNAL_SERVER_ERROR)}

    }
}

exports.id=async(id)=>{
    try{
        await db.authenticate();
        var result=await models.ranks.findOne({
            where:{RanksID:id}
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
        var result=await models.ranks.findAll({
            where:{Active:true}
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