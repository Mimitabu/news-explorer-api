const mongoose = require('mongoose');
const validator = require('validator');
const { invalidEmail } = require('../messagesData');

// схема модели
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: invalidEmail,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 6,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

// создание модели и экспорт
module.exports = mongoose.model('user', userSchema);
