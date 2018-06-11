var mongoose = require('mongoose');

var User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  age: {
    type: Number
  }
});


module.exports = {User};
