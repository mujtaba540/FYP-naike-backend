var db=require('../../config/config');
var initModels=require('../models/database/init-models');
var models=initModels(db)
var {Op}=require('sequelize')
const APIError = require('../errors/api-error');
const httpStatus = require('http-status');


async function createDetails(name,Data){
    try{
        if(Data!=null){
            Data.createdOn=new Date(),
            Data.createdBy=name
            Data.isActive=true
            Data.isDelete=false
            Data.status="active"
            Data.needCount=1,
            Data.resolveCount=0
            Data.currentQuantity=Data.initialQuantity
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
            Data.modifiedOn=new Date(),
            Data.modifiedBy=name
            return Data
        }else{
            return false;
        }
    }catch(error){
        return false;
    }
}
async function checkLimit(needID,userID,subcategoryID,initialQuantity,flag){
    var sumLimit=0
    if(flag){
        var maxlimit=await models.Need.findAll({where:{userID:userID,subcategoryID:subcategoryID,isActive:true},attributes:["initialQuantity"]})
    }else{
        var maxlimit=await models.Need.findAll({where:{needID:{[Op.ne]:needID},userID:userID,subcategoryID:subcategoryID,isActive:true},attributes:["initialQuantity"]})
    }
    for(var i=0;i<maxlimit.length;i++){
        sumLimit+=parseInt(maxlimit[i].initialQuantity)
    }
    sumLimit+=parseInt(initialQuantity)
    var subCatLimit=await models.SubCategories.findByPk(subcategoryID,{attributes:["maxLimit"]})
    
    if(sumLimit>parseInt(subCatLimit.maxLimit)){
        return {resposne:false,error:new APIError({
            message:"EXCEEDING SUBCATEGORY LIMIT",
            status:httpStatus.BAD_REQUEST
        })}
    }else{
        return {response:true}
    }
}

exports.create = async (Data) => {
    try {
        await db.authenticate()
        var username=await models.UserDetails.findByPk(Data.userID,{attributes:["firstName"]})
        if(Data.donationID!=null){
            var recheck=await models.Donation.findByPk(Data.donationID,{where:{userID:Data.userID}})
            if(recheck!=null){
                return {
                    response:false,
                    error:new APIError({
                        message:"Donation Raiser Can Not Raise Need",
                        status:httpStatus.BAD_REQUEST
                    })
                }
            }
        }
        // var subCategoryLimit=await checkLimit(Data.needID,Data.userID,Data.subcategoryID,Data.initialQuantity,true)
        // if(!subCategoryLimit.response){
        //     return {response:false,error:subCategoryLimit.error}
        // }
        var obj=await createDetails(username.firstName,Data)
        await models.Need.create(obj)
        return {
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
        var result=await models.Need.findOne({where:{needID:Data.needID}})
        if(result==null){
            return {resposne:false,error:new APIError({
                message:"NOT FOUND",
                status:httpStatus.NOT_FOUND
            })}
        }else{
               var newInitialQuantity=Data.initialQuantity
               var oldCurrent=await models.Need.findOne({where:{needID:Data.needID}})
               var oldInitialQuantity=await models.Need.findOne({where:{needID:Data.needID}})
               if(newInitialQuantity>oldInitialQuantity.initialQuantity){
                   var difference=newInitialQuantity-oldInitialQuantity.initialQuantity
                   Data.currentQuantity=parseInt(oldCurrent.currentQuantity)+difference
               }else{
                   if(newInitialQuantity<=oldCurrent.currentQuantity){
                       Data.currentQuantity=newInitialQuantity
                   }
               }
               Data.initialQuantity=newInitialQuantity
               var username=await models.UserDetails.findByPk(Data.userID,{attributes:["firstName"]})
               var obj=await modifiedDetails(username.firstName,Data)    
               await models.Need.update(obj,{where :{needID:Data.needID}})
               return {response:true}  
        }
        
    }catch(error){
        return {resposne:false,error:new APIError(httpStatus.INTERNAL_SERVER_ERROR)}
        
    }
 };

 exports.delete=async(id)=>{
    try{
        await db.authenticate()
            var check=await models.Need.findOne({where:{needID:id},attributes:["userID"]})
            if(check==null){
                return {resposne:false,error:new APIError({
                    message:"NOT FOUND",
                    status:httpStatus.NOT_FOUND
                })}
            }else{
                var username=await models.UserDetails.findByPk(check.userID,{attributes:["firstName"]})
               await models.Need.update({deletedBy:username.firstName,deletedOn:new Date(),isActive:false},
               {where :{
               needID:id,
               isActive:true}
           })
               return {response:true}
           
            }
    }catch(error){
        console.log(error.message)
        return {response:false,error:new APIError(httpStatus.INTERNAL_SERVER_ERROR)}

    }
}

exports.id=async(id)=>{
    try{
        await db.authenticate();
        var result=await models.Need.findOne({
            where:{needID:id,isActive:true},
            include:[{
                model:models.UserDetails,
                as:"user"
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
exports.all=async()=>{
    try{
        await db.authenticate();
        var result=await models.Need.findAll({where:{isActive:true}, include:[{
            model:models.UserDetails,
            as:"user"
        }]})
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

exports.count=async()=>{
    try{
        await db.authenticate();
        var result=await models.Need.findAndCountAll({where:{isActive:true}})
        if(result!==null){
            return {
                response:true,
                data:result.count
            }    
        }else{
            return {resposne:false,error:new APIError(httpStatus.NOT_FOUND)}
        }
    }catch(error){
        return {resposne:false,error:new APIError(httpStatus.INTERNAL_SERVER_ERROR)}
    }
}

exports.id_guest=async(id)=>{
    try{
        await db.authenticate();
        var result=await models.Need.findOne({
            where:{needID:id,isActive:true}
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
exports.all_guest=async()=>{
    try{
        await db.authenticate();
        var result=await models.Need.findAll({where:{isActive:true}})
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

exports.user_id=async(id)=>{
    try{
        await db.authenticate();
        var result=await models.Need.findAll({
            where:{userID:id,isActive:true}
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