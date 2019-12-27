const jwt = require('jsonwebtoken');
const { authConfig ,tokenConfig} = require('../../../config').appConfig;
const logger = require('../../../logger');

const generateToken = (payload, secret, expiresIn, done) => {
  jwt.sign(payload,secret,{expiresIn:expiresIn}, done);
}
const verifyToken = (token, secret, done) => {
  logger.debug('Inside auth.js verifyToken');

    jwt.verify(token, secret, function(err, decoded) {
            if (err) {
              done(err.message);
            }
            else{
              done(undefined, decoded);
            }
      });
 
}

const isAuhthenticated = (req, res, next) => {
 logger.debug('Inside auth.js isAuhthenticated');
 const authorizationHeader = req.get('Authorization');
  if(!authorizationHeader) { res.status(403).json({isAuthenticated: false}); return; }

  const token = authorizationHeader.replace('Bearer ', '');
  verifyToken(token,tokenConfig.secret, (err) => {
    logger.debug('Inside auth.js verifyToken' , token);
    if(err) { logger.debug('Inside auth.js verifyToken error: ',err);
      res.status(403).json({isAuthenticated: false, message : err}); return; }
    else res.status(200).json({isAuthenticated: true}); return;
  })
}

function authorize() {
  return function(req, res, next) {
    logger.debug('Inside auth.js authorize');
    const authorizationHeader = req.get('Authorization');
    if(!authorizationHeader) { res.status(403).send('Not authenticated'); return; }

    const token = authorizationHeader.replace('Bearer ', '');
    if(!token) { res.status(403).send('Not authenticated'); return; }
    logger.debug('Inside auth.js authorize' , token);
    verifyToken(token, tokenConfig.secret, (err) => {
      if(err) { res.status(403).send(err); return; }
      logger.debug('Inside auth.js authorize verifyToken');
      next();
    });
  }
}
module.exports = {
  generateToken,
  verifyToken,
  isAuhthenticated,
  authorize
}