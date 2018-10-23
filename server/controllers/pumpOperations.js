require('./../configs/config');
const mongoose = require('./../db/mongoose');
const PumpOperation = require('./../models/PumpOperation');
const router = require('express').Router();
const moment = require('moment');

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

router.post('/onOperation', (req, res) => {
  var startTime = moment().valueOf();
  var newOperation = new PumpOperation({
    deviceId: req.body.deviceId,
    onTime: startTime,
    offTime: startTime.add(2, 'h'),
    location: req.body.location
  });
  newOperation.save()
    .then(pumpOperation => {
      res.send({pumpOperation});
    })
    .catch((err) => {
      res.status(400).send();
    })
})


router.put('/offOpeartion/:operationId', (req, res) => {
  var body = {
    offTime: moment().valueOf()
  }
  PumpOperation.findOneAndUpdate({operationId: req.body.operationId}, {$set: body}, {new: true}).then((pumpOperation) => {
    res.send({pumpOperation});
  }).catch((err) => {
    res.status(400).send();
  })
});

router.get('allOperations/:deviceId', (req, res) => {
  PumpOperation.find({'deviceId': req.params.deviceId}).then((operations) => {
    res.send({operations});
  }).catch(e => {
    res.status(400).send();
  })
});

module.exports = router;