const router = require('express').Router();
const userRotues = require('./userRotues');

router.use('/users', userRotues);

module.exports = router;