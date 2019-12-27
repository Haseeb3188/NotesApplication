let express = require('express');
let app = express();
let appService =  require('./app.service');
appService.initializeMongooseConnection();
appService.setAppMiddleware(app);
appService.noteAuthorize(app);
appService.apiSetUp(app);
appService.errorHandler404(app);

module.exports = app;