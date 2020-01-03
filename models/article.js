const mongoose = require('mongoose');
const validator = require('validator');

// схема модели
const userSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
    minlength: 2,
  },
  title: {
    type: String,
    required: true,
    minlength: 2,
  },
  text: {
    type: String,
    required: true,
    minlength: 2,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v, { protocols: ['http', 'https'], require_tld: true, require_protocol: true }),
      message: 'It is not valid URL',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v, { protocols: ['http', 'https'], require_tld: true, require_protocol: true }),
      message: 'It is not valid URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    select: false,
  },
});

// создание модели и экспорт
module.exports = mongoose.model('article', userSchema);
