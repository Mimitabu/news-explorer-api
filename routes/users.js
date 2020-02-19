const routerUsers = require('express').Router();
const cors = require('cors');
const { getUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
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
routerUsers.get('/users/me', cors(corsOptions), auth, getUser);

module.exports = routerUsers;
