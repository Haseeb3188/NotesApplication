const router = require('express').Router();
let { authConfig } = require('../../../config').appConfig;
const auth = require('./auth')
const logger = require('../../../logger');

// api to check is user authenticated or not
router.post('/isAuthenticated', auth.isAuhthenticated)

module.exports = router;
