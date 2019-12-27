const usersService =  require('./users.service')
const logger = require('../../../logger');

// Handler to login user
const loginUser = (user) => {
  logger.debug('Inside users.controller loginUser method');
  return usersService.loginUser(user);
}

// Handler to register user
const registerUser = (userDetails) => {
  logger.debug('Inside users.controller registerUser method');
  return usersService.registerUser(userDetails);
}


module.exports = {
  loginUser,
  registerUser
}
