const routerUsers = require('express').Router();
const { getUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

routerUsers.get('/users/me', auth, getUser);

module.exports = routerUsers;
