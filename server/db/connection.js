const mongoose = require('mongoose');
const { dbConfig } = require('../config').appConfig;
const logger = require('../logger');

function createMongoConnection(){
    mongoose.connect(dbConfig.mongoUrl, {useCreateIndex:true, useNewUrlParser: true });
}

function getMongoConnection(){
    return mongoose.connection;
}
// Event listener for mongo "error" event.
function onError(err) {
 logger.error('Error in database connection...', err);
}

//Event listener for mongo "open" event
function onSuccess() {
 logger.info('Connected to mongo database');
}

module.exports = {
    createMongoConnection,
    getMongoConnection,
    onError,
    onSuccess
}