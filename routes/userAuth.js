const routerUserAuth = require('express').Router();
const { login, createUser } = require('../controllers/users');
const { signinValidation, signupValidation } = require('../validation');

routerUserAuth.post('/signin', signinValidation, login);
routerUserAuth.post('/signup', signupValidation, createUser);

module.exports = routerUserAuth;
