const routerUserAuth = require('express').Router();
const cors = require('cors');
const { login, createUser } = require('../controllers/users');
const { signinValidation, signupValidation } = require('../validation');
const corsOptions = require('./cors');

routerUserAuth.post('/signin', cors(corsOptions), signinValidation, login);
routerUserAuth.post('/signup', cors(corsOptions), signupValidation, createUser);

module.exports = routerUserAuth;
