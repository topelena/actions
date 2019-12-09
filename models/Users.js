const mongoose = require('mongoose')
const Schema = mongoose.Schema;
let userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('users', userSchema);