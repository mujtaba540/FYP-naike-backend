const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/need.controller');
// const NeedEth = require("../../models/etherium/need.ethmodel")
const multer = require('../../middlewares/multer.middleware')
const { authorize, authenticate, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const {
  listUsers,
  createUser,
  replaceUser,
  updateUser,
} = require('../../validations/user.validation');
const { createNeed } = require('../../validations/need.validation');

const router = express.Router();

router
  .route('/count')
  .get(authenticate(), controller.count)

router
  .route('/')
  .get(controller.all)
  // .post(authorize(ADMIN), validate(createUser), controller.emp_create);
  .post(authenticate(), validate(createNeed), controller.create);
// .post(controller.create);



// router
//   .route('/deploy')
//   .get(()=>{
//     NeedEth.deploy(function (err, success) {
//       if (!err) {
//           console.log('Deployed successfully');
//       }
//   });
//   });

router
  .route('/:id')

  .get(authenticate(), controller.id)
  //   .put(authorize(LOGGED_USER), validate(replaceUser), controller.replace)

  .put(authenticate(), controller.update)
  .patch(authenticate(), controller.delete);


router
  .route('/user/:id')

  .get(authenticate(), controller.user_id)
module.exports = router;
