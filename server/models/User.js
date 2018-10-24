const mongoose = require('mongoose');
const randomString = require('random-string');

var userSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true
  },
  name: {
    type: String
  },
  email: {
    type: String,

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