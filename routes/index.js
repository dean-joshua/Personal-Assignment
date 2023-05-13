const router = require('express').Router();

router.use('/', require('./swagger'));
router.use('/contacts', require('./contact'));

module.exports = router;
