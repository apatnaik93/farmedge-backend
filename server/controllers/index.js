var router = require('express').Router();

router.use('/user',require('./users'));
router.use('/device',require('./devices'));

module.exports = router;