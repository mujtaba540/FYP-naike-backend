NeedEth=require('../models/etherium/need.ethmodel')
const APIError = require('../errors/api-error');
const httpStatus = require('http-status');
const Category=require('../models/etherium/need.ethmodel')

exports.create = async (req, res, next) => {
    try {
      var Data = req.body;
      if(Data==undefined)return next(new APIError({
        status:httpStatus.BAD_REQUEST,
        message:"BAD REQUEST"
      }))
      Category.save(newCategoryObject, function (err, objectSaved) {
        if (!err) {
            res.json(objectSaved);
        } else {
            res.send(err)
        }
    });
      if(result.response){
          res.status(httpStatus.CREATED);
          res.json({
              Status:{code:httpStatus.OK,
              "message":"Success"},Data:{}
          })
      }else{
          return next(result.error)
      }
      
  } catch (error) {
      return next(error)
         
    }
  };
NeedEth.save(newNeedEthObject, function (objectSaved, err) {
    if (!err) {
        console.log('object saved');
    }
 });

 NeedEth.find(function (allRecords, err) {
    if (!err) {
        console.log(allRecords);
    }
 });

 NeedEth.findById('Audi A4', function (record, err) {
    if (!err) {
        console.log(record);
    }
 });

 NeedEth.deleteById('Audi A4', function (success, err) {
    if (!err) {
        console.log('object deleted successfully');
    }
 });

 NeedEth.updateById('Audi A4', updatedNeedEthObject, function (updatedObject, err) {
    if (!err) {
        console.log('object updated successfully');
    }
 });