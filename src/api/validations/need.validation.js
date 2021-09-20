const Joi = require('joi');

module.exports = {

  // GET /v1/users
  // listUsers: {
  //   query: {
  //     page: Joi.number().min(1),
  //     perPage: Joi.number().min(1).max(100),
  //     name: Joi.string(),
  //     email: Joi.string(),
  //     role: Joi.string().valid(User.roles),
  //   },
  // },

  // POST /v1/users
  createNeed: {
    body: {
        userID:Joi.number().required().positive(),
        subCategoryID:Joi.number().required(),
        donationID:Joi.number().optional().allow('',null),
        longitude:Joi.number().required(),
        latitude:Joi.number().required(),
        description:Joi.string().required(),
        deadline:Joi.date().required(),
        initialQuantity:Joi.number().required(),
        deliveryType:Joi.string().valid('Pick Up','Drop Off','Pick Up and Drop Off').required(),
        // deliveryType:Joi.string().required(),
        title:Joi.string().required()  
    },
  },

  // PUT /v1/users/:userId
  // replaceUser: {
  //   body: {
  //     email: Joi.string().email().required(),
  //     password: Joi.string().min(6).max(128).required(),
  //     name: Joi.string().max(128),
  //     role: Joi.string().valid(User.roles),
  //   },
  //   params: {
  //     userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
  //   },
  // },

  // // PATCH /v1/users/:userId
  // updateUser: {
  //   body: {
  //     email: Joi.string().email(),
  //     password: Joi.string().min(6).max(128),
  //     name: Joi.string().max(128),
  //     role: Joi.string(),
  //   },
  //   params: {
  //     userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
  //   },
  // },
};
