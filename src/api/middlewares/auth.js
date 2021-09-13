const httpStatus = require('http-status');
const passport = require('passport');
const User = require('../models/user.model');
const APIError = require('../errors/api-error');


const handleRoles = (req, res, next, roles) => async (err, user, info) => {
  const error = err || info;
  const apiError = new APIError({
    message: error ? error.message : 'Unauthorized',
    status: httpStatus.UNAUTHORIZED,
    stack: error ? error.stack : undefined,
  })
  try{
    if (error || !user.role.roleName) throw error;
    } catch (e) {
    return next(apiError);
  }
  
  if (!roles.includes(user.role.roleName)) {
      apiError.status = httpStatus.FORBIDDEN;
      apiError.message = 'Forbidden';
      return next(apiError);
  } 
  req.username=user.role.roleName
  return next()

};

const verifyUser=(req,res,next)=>async(err,user,info)=>{
  const error = err||info ;
  const apiError = new APIError({
    message: error ? error.message : 'Unauthorized',
    status: httpStatus.UNAUTHORIZED,
    stack: error ? error.stack : undefined,
  })
  try{
    if (error || !user) throw error;
    } catch (e) {
    return next(apiError);
  }
  
  return next()
}

exports.authorize = (roles) => (req, res, next) => passport.authenticate(
  'jwt', { session: false },
  handleRoles(req, res, next, roles),
)(req, res, next);

exports.oAuth = (service) => passport.authenticate(service, { session: false });

exports.authenticate=()=>(req,res,next)=>passport.authenticate(
  'jwt',{sesion:false},
  verifyUser(req,res,next))(req,res,next)