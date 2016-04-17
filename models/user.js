var mongoose = require('mongoose');

// user schema for mongoDB
const gifSchema = new mongoose.Schema({
  videoId: {
    type: String,
  },
  start: {
    type: String,
  },
  duration: {
    type: String,
  }
}, {
  _id: false
});
const userSchema = mongoose.Schema({
  email: String,
  name: String,
  history: [gifSchema]
});

module.exports = mongoose.model('User', userSchema);
