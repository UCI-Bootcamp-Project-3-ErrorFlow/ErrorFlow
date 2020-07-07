const router = require('express').Router();
router.use('/api', require('./userRoutes.js'));
router.use('/api', require('./postRoutes.js'));
router.use('/api', require('./commentRoutes.js'))
router.use('/', require('./socketRoutes'))
module.exports = router;
