const router = require('express').Router();
const userRotues = require('./userRoutes');

router.use('/users', userRotues);

module.exports = router;