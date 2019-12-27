const router = require('express').Router();
const usersCtrl = require('./users.controller');
const logger = require('../../../logger');

// api to login into the system
router.post('/login', (req, res) => {
  logger.debug('Inside user.router login');
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(403).send({message:'Invalid input passsed'});
    } else {
      usersCtrl.loginUser(req.body).then((response) => {
        logger.debug('Inside usersCtrl.loginUser success');
        res.status(response.status).send(response);
      },
      (err) => {
        logger.error('Error in usersCtrl.loginUser error: ', err.message);
        res.status(err.status).send(err);
      });
    }
  } catch (err) {
    logger.error('Unexpected error in usersCtrl.loginUser ', err);
    res.send({message: 'Failed to complete request'})
  }
});

// api to register a user into the system
router.post('/register', (req, res) => {
  logger.debug('Inside user.router registerUser');
  try {
    if (Object.keys(req.body).length < 2) {
      res.status(403).send({message:'Invalid input passsed'});
    } else {
      usersCtrl.registerUser(req.body).then((response) => {
        logger.debug('Inside usersCtrl.registerUser success');
        logger.info(response.message);
        res.status(response.status).send(response);
      }, 
      (err) => {
        logger.error('Error in usersCtrl.registerUser error: ', err.message);
        res.status(err.status).send(err);
      });
    }
  }
  catch (err) {
    logger.error('Unexpected error in usersCtrl.registerUser ', err);
    res.send({message: 'Failed to complete request'})
  }
});

module.exports = router;