const mongoose = require('mongoose');
const randomString = require('random-string');

var pumpOperationSchema = new mongoose.Schema({
  operationId: {
    type: String,
    unique: true
  },
  deviceId: {
    type: String
  },
  onTime: {
    type: String
  },
  offTime: {
    type: String
  }
});

var PumpOperation = module.exports = mongoose.model('PumpOperation', pumpOperationSchema);