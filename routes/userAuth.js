const routerUserAuth = require('express').Router();
// const cors = require('cors');
const { login, createUser } = require('../controllers/users');
const { signinValidation, signupValidation } = require('../validation');
// const corsOptions = require('./cors');
// const whitelist = ['http://localhost:8080', 'http://news-explorer.pw'];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };

routerUserAuth.post('/signin', signinValidation, login);
routerUserAuth.post('/signup', signupValidation, createUser);

module.exports = routerUserAuth;
