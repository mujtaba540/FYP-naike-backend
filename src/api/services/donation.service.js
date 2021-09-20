var db=require('../../config/config');
var initModels=require('../models/Database/init-models');
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
async function checkLimit(donationID,userID,subcategoryID,initialQuantity,flag){
    var sumLimit=0
    if(flag){
        var maxlimit=await models.Donation.findAll({where:{userID:userID,subCategoryID:subcategoryID,isActive:true},attributes:["initialQuantity"]})
    }else{
        var maxlimit=await models.Donation.findAll({where:{donationID:{[Op.ne]:donationID},userID:userID,subCategoryID:subcategoryID,isActive:true},attributes:["initialQuantity"]})
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
        var subCategoryLimit=await checkLimit(Data.donationID,Data.userID,Data.subcategoryID,Data.initialQuantity,true)
        if(!subCategoryLimit.response){
            return {response:false,error:subCategoryLimit.error}
        }
        var obj=await createDetails(username.firstName,Data)
        await models.Donation.create(obj)
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

 exports.update=async(Data)=>{
    try{
        await db.authenticate();
        var result=await models.Donation.findOne({where:{donationID:Data.donationID}})
        if(result==null){
            return {resposne:false,error:new APIError({
                message:"NOT FOUND",
                status:httpStatus.NOT_FOUND
            })}
        }else{
        //    var subCategoryLimit=await checkLimit(Data.donationID,Data.userID,Data.subcategoryID,Data.initialQuantity,false)
        //    if(subCategoryLimit.response){
        //        var newInitialQuantity=Data.initialQuantity
        //        var oldCurrent=await models.Donation.findOne({where:{donationID:Data.donationID}})
        //        var oldInitialQuantity=await models.Donation.findOne({where:{donationID:Data.donationID}})
        //        if(newInitialQuantity>oldInitialQuantity.initialQuantity){
        //            var difference=newInitialQuantity-oldInitialQuantity.initialQuantity
        //            Data.currentQuantity=parseInt(oldCurrent.currentQuantity)+difference
        //        }else{
        //            if(newInitialQuantity<=oldCurrent.currentQuantity){
        //                Data.currentQuantity=newInitialQuantity
        //            }
        //        }
               var username=await models.UserDetails.findByPk(Data.userID,{attributes:["firstName"]})
            //    Data.initialQuantity=newInitialQuantity
               var obj=await modifiedDetails(username.firstName,Data)    
               await models.Donation.update(obj,{where :{donationID:Data.donationID}})
               return {response:true}  
        //    }else{
        //        return {response:false,error:subCategoryLimit.error}
        //    }
        }
        
    }catch(error){
        return {resposne:false,error:new APIError(httpStatus.INTERNAL_SERVER_ERROR)}
        
    }
 };

 exports.delete=async(id)=>{
    try{
        await db.authenticate()
            var check=await models.Donation.findOne({where:{donationID:id},attributes:["userID"]})
            if(check==null){
                return {resposne:false,error:new APIError({
                    message:"NOT FOUND",
                    status:httpStatus.NOT_FOUND
                })}
            }else{
                var username=await models.UserDetails.findByPk(check.userID,{attributes:["firstName"]})
               await models.Donation.update({deletedBy:username.firstName,deletedOn:new Date(),isActive:false},
               {where :{
                donationID:id,
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
        var result=await models.Donation.findOne({
            where:{donationID:id,isActive:true},
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
        var result=await models.Donation.findAll({where:{isActive:true},include:[{
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
        var result=await models.Donation.findAndCountAll({where:{isActive:true}})
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
        var result=await models.Donation.findOne({
            where:{donationID:id,isActive:true}
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
        var result=await models.Donation.findAll({where:{isActive:true}})
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
        var result=await models.Donation.findOne({
            where:{userID:id,isActive:true},
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
