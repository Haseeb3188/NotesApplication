const router = require('express').Router();


router.use('/users',require('./users'));
router.use('/notes',require('./notes'));
router.use('/',require('./auth'));

module.exports = router;