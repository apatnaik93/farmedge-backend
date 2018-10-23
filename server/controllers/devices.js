require('./../configs/config');
// const mongoose = require('./../db/mongoose');
const Device = require('./../models/Device');
const router = require('express').Router();

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

router.post('/registerDevice', (req, res) => {
  User.findOne([{'simNumber': req.body.simNumber}]).then(device => {
    if (device) {
      res.send({device});
    } else {
      var newDevice = new Device({
        userId: req.body.userId,
        name: req.body.name,
        simNumber: req.body.simNumber,
        location: req.body.location
      });
      newDevice.save().then(device => {
        res.send({device});
      });
    }
  }).catch((err) => {
    res.status(400).send();
  })
});

router.get('/getDevices/:userId', (req, res) => {
  Device.find({'userId': req.params.userId}).then(devices => {
    res.send({devices});
  }).catch((err) => {
    res.status(400).send();
  })
});

module.exports = router;