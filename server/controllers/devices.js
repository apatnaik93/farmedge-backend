require('./../configs/config');
const mongoose = require('./../db/mongoose');
const Device = require('./../models/Device');
const User = require('./../models/User');
const router = require('express').Router();

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

router.post('/registerDevice', (req, res) => {
    Device.findOne({'simNumber': req.body.simNumber}).then(device => {
        if (device) {
            res.send({device});
        } else {
            var newDevice = new Device({
                deviceId: "DVS" + makeid() + Date.now(),
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

router.put('/updateDevice', (req, res) => {
    var updatedDevice = {
        name: req.body.name,
        simNumber: req.body.simNumber,
        location: req.body.location
    };
    Device.findOneAndUpdate({'deviceId': req.body.deviceId}, {$set: updatedDevice}, {new: true}).then((device) => {
        console.log(device);
        res.send({device});
    }).catch((err) => {
        res.status(400).send();
    })
});

router.delete('/deleteDevice/:deviceId', (req, res) => {
    console.log(req.params.deviceId);
    Device.remove({'deviceId': req.params.deviceId}).then((response) => {
        res.send({response});
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