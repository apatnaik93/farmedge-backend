const mongoose = require('mongoose');
const randomString = require('random-string');

var deviceSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    default: 'DVS' + randomString({length: 5, numeric: true, letters: false, special: false})+ Date.now()
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
  }
});

module.exports = mongoose.model('Device', deviceSchema);