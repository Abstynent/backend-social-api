const router = require('express').Router();
const userRotues = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/users', userRotues);
router.use('/thoughts', thoughtRoutes);

module.exports = router;