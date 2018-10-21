const mongoose = require('mongoose');
const randomString = require('random-string');

var userSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: 'USR' + randomString({length: 5, numeric: true, letters: false, special: false}) + Date.now()
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  mobile: {
    type: String,
    unique: true
  },
  location: {
    type: String
  }
});

var User = module.exports = mongoose.model('User', userSchema);