const httpStatus = require('http-status');
const category = require('../services/category.service');
const APIError = require('../errors/api-error');
const Category=require('../models/etherium/category.ethmodel')



exports.create = async (req, res, next) => {
  try {
    var Data = req.body;
    if (Data == undefined) return next(new APIError({
      status: httpStatus.BAD_REQUEST,
      message: "BAD REQUEST"
    }))
    var result = await category.create(Data);
    if (result.response) {
      res.status(httpStatus.CREATED);
      res.json({
        Status: {
          code: httpStatus.OK,
          "message": "Success"
        }, Data: {}
      })
    } else {
      return next(result.error)
    }

  } catch (error) {
    return next(error)

  }
};

exports.update = async (req, res, next) => {
  try {
    var Data = req.body;
    if (Data == undefined) return next(new APIError({
      status: httpStatus.BAD_REQUEST,
      message: "BAD REQUEST"
    }))
    Data.categoryID = req.params.id
    var result = await category.update(Data)
    if (result.response) {
      res.status(httpStatus.OK);
      res.json({
        Status: {
          "code": "200",
          "message": "Success"
        }, Data: {}
      })
    } else {
      return next(result.error)
    }
  } catch (error) {
    return next(error)
  }
};

exports.list = async (req, res, next) => {
  try {
    const users = await User.list(req.query);
    const transformedUsers = users.map((user) => user.transform());
    res.json(transformedUsers);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    var username = req.username
    var id = req.params.id
    var result = await category.delete(id, username)
    if (result.response) {
      res.status(httpStatus.OK).json({
        Status: {
          code: httpStatus.OK,
          message: "category Deleted"
        }, Data: {}
      })
    } else {
      return next(result.error)

    }
  } catch (error) {
    return next(error)
  }
};

exports.all = async (req, res, next) => {
  try {
    var result = await category.all()
    if (result.response) {
      res.status(httpStatus.OK).json({
        Status: {
          code: httpStatus.OK,
          message: "Success",
        }, Data: {
          data: result.data
        }
      })
    } else {
      return next(result.error)
    }
  } catch (error) {
    return next(error)
  }
},

  exports.id = async (req, res, next) => {
    try {
      var id = req.params.id
      var result = await category.id(id)
      if (result.response) {
        res.status(httpStatus.OK).json({
          Status: {
            code: httpStatus.OK,
            message: "Success",
          }, Data: { data: result.data }
        })
      } else {
        return next(result.error)
      }
    } catch (error) {
      return next(error)
    }
  }

exports.count = async (req, res, next) => {
  try {
    var result = await category.count()
    if (result.response) {
      res.status(httpStatus.OK).json({
        Status: {
          code: httpStatus.OK,
          message: "Success",
        }, Data: {
          data: { count: result.data }
        }
      })
    } else {
      return next(result.error)
    }
  } catch (error) {
    return next(error)
  }
}
exports.all_guest = async (req, res, next) => {
  try {
    var result = await category.all_guest()
    if (result.response) {
      res.status(httpStatus.OK).json({
        Status: {
          code: httpStatus.OK,
          message: "Success",
        }, Data: { data: result.data }

      })
    } else {
      return next(result.error)
    }
  } catch (error) {
    return next(error)
  }
},

  exports.id_guest = async (req, res, next) => {
    try {
      var id = req.params.id
      var result = await category.id_guest(id)
      if (result.response) {
        res.status(httpStatus.OK).json({
          Status: {
            code: httpStatus.OK,
            message: "Success",
          }, Data: { data: result.data }
        })
      } else {
        return next(result.error)
      }
    } catch (error) {
      return next(error)
    }
  }

exports.findBlkAll = async (req, res, next) => {
  try {
    Category.find(function (err, allObjects) {
      if (!err) {
        console.log(allObjects)
        res.status(httpStatus.OK).json({
          Status: {
            code: httpStatus.OK,
            message: "Success",
          }, Data: { data: allObjects }
        })
      } else {
        return next(err)
      }
    });
  } catch (error) {
    return next(error)
  }
}

