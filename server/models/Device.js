const mongoose = require('mongoose');
const randomString = require('random-string');

var deviceSchema = new mongoose.Schema({
  deviceId: {
    type: String
  },
  userId: {
    type: String
  },
  name: {
    type: String
  },
  simNumber: {
    type: String,
    unique: true
  },
  location: {
    type: String
  },
  status:{
    type: Boolean,
    default: false
  },
  operationId:{
    type: String
  }
});

var Device = module.exports = mongoose.model('Device', deviceSchema);