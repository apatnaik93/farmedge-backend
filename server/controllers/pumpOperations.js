require('./../configs/config');
const mongoose = require('./../db/mongoose');
const PumpOperation = require('../models/PumpOperation');
const Device = require('./../models/Device');
const router = require('express').Router();
const moment = require('moment');

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
});

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 8; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

router.post('/onOperation', (req, res) => {
    var startTime = moment.tz("Asia/Kolkata").format();
    var newOperation = new PumpOperation({
        operationId: "POP" + makeid() + Date.now(),
        deviceId: req.body.deviceId,
        onTime: startTime + ""
    });
    newOperation.save()
        .then(pumpOperation => {
            var body = {
                operationId: pumpOperation.operationId,
                status: true
            };
            Device.findOneAndUpdate({deviceId: req.body.deviceId}, {$set: body}, {new: true}).then((Device) => {
                res.send({pumpOperation});
            }).catch((err) => {
                res.status(400).send();
            })
        })
        .catch((err) => {
            res.status(400).send();
        })
});


router.put('/offOpeartion', (req, res) => {
    var body = {
        offTime: moment.tz("Asia/Kolkata").format()
    };
    PumpOperation.findOneAndUpdate({operationId: req.body.operationId}, {$set: body}, {new: true}).then((pumpOperation) => {
        var deviceBody = {
            operationId: null,
            status: false
        };
        Device.findOneAndUpdate({deviceId: req.body.deviceId}, {$set: deviceBody}, {new: true}).then((Device) => {
            res.send({pumpOperation});
        }).catch((err) => {
            res.status(400).send();
        });
        res.send({pumpOperation});
    }).catch((err) => {
        res.status(400).send();
    })
});

router.get('/allOperations/:deviceId', (req, res) => {
    PumpOperation.find({'deviceId': req.params.deviceId}).then((operations) => {
        res.send({operations});
    }).catch(e => {
        res.status(400).send();
    })
});

module.exports = router;