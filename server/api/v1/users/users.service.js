const usersDAO =  require('./users.dao')
const logger = require('../../../logger');

// Handler to login user
const loginUser = (user) => {
  logger.debug('Inside users.usersDAO loginUser method');
  return usersDAO.loginUser(user);
}

// Handler to register user
const registerUser = (userDetails) => {
  logger.debug('Inside users.usersDAO registerUser method');
  return usersDAO.registerUser(userDetails);
}


module.exports = {
  loginUser,
  registerUser
}
