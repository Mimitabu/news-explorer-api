const routerUserAuth = require('express').Router();
const cors = require('cors');
const { login, createUser } = require('../controllers/users');
const { signinValidation, signupValidation } = require('../validation');
// const corsOptions = require('./cors');
const whitelist = ['http://localhost:8080', 'http://news-explorer.pw'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

routerUserAuth.post('/signin', cors(corsOptions), signinValidation, login);
routerUserAuth.post('/signup', cors(corsOptions), signupValidation, createUser);

module.exports = routerUserAuth;
