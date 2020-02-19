const routerUsers = require('express').Router();
const cors = require('cors');
const { getUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const corsOptions = require('./cors');

routerUsers.get('/users/me', cors(corsOptions), auth, getUser);

module.exports = routerUsers;
