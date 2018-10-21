require('./../configs/config');
const mongoose = require('./../db/mongoose');
const User = require('./../models/User');
const router = require('express').Router();

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

router.post('/registerUser', (req, res) => {
  console.log(req.body);
  User.findOne({'mobile': req.body.mobile}).then(user => {
    if (user) {
      res.send({user});
    } else {
      var newUser = new User({
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email,
        location: req.body.location
      });
      newUser.save().then(user => {
        res.send({user});
      });
    }
  }).catch((err) => {
    res.status(400).send();
  })
});

router.get('/getUser/:mobile', (req, res) => {
  User.findOne({'mobile': req.params.mobile}).then(user => {
    res.send({user});
  }).catch((err) => {
    res.status(400).send();
  })
});

module.exports = router;