const bodyParser = require('body-parser');
const cors = require('cors')
const logger = require('./logger');
const api = require('./api/v1');
const { serverConfig } = require('./config').appConfig;
const db = require('./db');
const authorize = require('./api/v1/auth/auth.js').authorize

//Event listener for HTTP server "error" event.
const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  let bind = 'Port ' + serverConfig.port;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(bind + ' requires elevated privileges');
      break;
    case 'EADDRINUSE':
      logger.error(bind + ' is already in use');
      break;
    default:
      throw error;
  }
}

//Event listener for HTTP server "listening" event.
const onListening = () => {
  logger.info(`Server running at http://${serverConfig.hostname}:${serverConfig.port}/`);
}

// initialize moongoose connection
const initializeMongooseConnection = () => {
    console.log(' connection initiated');
    db.createMongoConnection();
}

// settting application middleware with basic modules
const setAppMiddleware = (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors());
}

// note api authorize
const noteAuthorize = (app) =>{
  app.get('/api/v1/notes(|/*)', authorize());
  // app.get('/api/v1/notes(|/*)');
  app.post('/api/v1/notes(|/*)', authorize());
  app.put('/api/v1/notes(|/*)', authorize()); 
}

// api configuration
const apiSetUp = (app) => {
  app.use('/api/v1/', api);
}


// Error handler to get 404 request
const errorHandler404 = (app) => {
  // catch 404
  app.use(function(req, res) {
    let originUrl = `http://${serverConfig.hostname}:${serverConfig.port}${req.url}`;
    let err = new Error();
    err.status = 404;
    err.url = originUrl
    err.message = `Http failure response for ${originUrl}: 404 Not Found`,
    logger.error(err.message);
    res.send(err);
  });
}

module.exports = {
  onError,
  onListening,  
  setAppMiddleware,
  errorHandler404,
  apiSetUp,
  noteAuthorize,
  initializeMongooseConnection
}