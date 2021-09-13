const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/role.controller');
const multer=require('../../middlewares/multer.middleware')
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const {
  listUsers,
  createUser,
  replaceUser,
  updateUser,
} = require('../../validations/user.validation');

const router = express.Router();

// router.param('userId', controller.load);

router
  .route('/')
    .get(authorize(['admin']), controller.all)
  // .post(authorize(ADMIN), validate(createUser), controller.emp_create);
  .post(authorize(['admin']),multer.single('PhotoPath'),  controller.create);

// router
//   .route('/profile')
//   .get(authorize(), controller.loggedIn);

router
  .route('/:id')

   .get(authorize(['admin']), controller.id)
//   .put(authorize(LOGGED_USER), validate(replaceUser), controller.replace)

  .put(authorize(['admin']),multer.single('PhotoPath'), controller.update)
  .patch(authorize(['admin']),multer.single('PhotoPath'), controller.delete);


module.exports = router;
