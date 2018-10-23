var router = require('express').Router();

router.use('/user',require('./users'));
router.use('/device',require('./devices'));
router.use('/pump',require('./pumpOperations'));

module.exports = router;