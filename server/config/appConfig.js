// write your application configration here

const serverConfig = {
    port : 3000,
    hostname : '127.0.0.1'
}

const dbConfig = {
    mongoUrl :  'mongodb://localhost:27017/testDB'
}
// Logger configuration
const loggerConfig = {
    appenders: {
      console: {
        type: 'console'
      },
      keepLogs: {
        type: 'file',
        filename: './server/logs/keep.log'
      }
    },
    categories: {
      default: { appenders: ['console', 'keepLogs'], level: 'trace' }
    }
  };
  
  const tokenConfig = {
    secret : 'keep_assignment_2',
    expires : '10h'
};
module.exports = {
    serverConfig,
    dbConfig,
    loggerConfig,
    tokenConfig
}