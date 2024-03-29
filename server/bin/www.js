const app = require('../app')
const http = require('http');
const { serverConfig } = require('../config').appConfig;
const appService = require('../app.service')

// Create HTTP server
let server = http.createServer(app);

// Server is listening on provide port
server.listen(serverConfig.port);
server.on('error', appService.onError);
server.on('listening', appService.onListening);
