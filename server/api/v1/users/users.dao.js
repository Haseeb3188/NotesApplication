let userModel = require('./users.entity');
let common = require('../../../common');
const uuidv1 = require('uuid/v1');
const logger = require('../../../logger');
const generateToken = require('../auth/auth.js').generateToken;
const { tokenConfig } = require('../../../config').appConfig;

const loginUser = (userInfo) => {
  logger.debug('Inside users.dao loginUser method', userInfo);
  return new Promise((resolve, reject) => {
    userModel.findOne({userName: userInfo.username}, function(err, user) {
      if(err) {
        logger.error(err);
        reject({message: 'Internal Server Error', status: 500});
      } else if(user) {
        // password is correct or not
        common.comparePassword(userInfo.password, user.password, function(error, isMatch) {
          if (isMatch && !error) {
            let payload = {userName: user.userName, userId: user.userId};
            generateToken(payload,tokenConfig.secret, tokenConfig.expires, (err, token) => {
              if(err) { reject({message: err, status: 403}); return; }
              resolve({token: token, user: payload, status: 200});
            });            
          } else {
            reject({message: 'Passwords is incorrect', status: 403});
          }
        });
      } else {
        reject({message: 'You are not registered user', status: 403});
      }
    });
  });
};

const registerUser = (userInfo) => {
  logger.debug('Inside users.dao registerUser method');
  return new Promise((resolve, reject) => {
    userModel.findOne({userName: userInfo.username}, function(err, user) {
      if(err) {
        logger.error(err);
        reject({message: 'Internal Server Error', status: 500});
      } else if(user) {
        reject({message:'username is already exist',userId: 0, status: 201});
      } else {
        let newUser = new userModel();
        newUser.userId = uuidv1();
        newUser.userName = userInfo.username;
        newUser.password = userInfo.password;
        newUser.email = userInfo.email;
        newUser.save(function(error, addedUser) {
          if(error) {
            logger.error(error);
            reject({message: 'Internal Server Error', status: 500});
          } else {
            resolve({message: 'Successfully registered', status: 201, userId: addedUser.userId});
          }
        });
      }
    });
  });
 };

 module.exports = {
  loginUser,
  registerUser
 }
