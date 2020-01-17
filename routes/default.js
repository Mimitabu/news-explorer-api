const routerDefault = require('express').Router();
const NotFoundError = require('../errors/not-found-error');
const { notFoundErrorMessage } = require('../messagesData');

routerDefault.use('*', (req, res) => {
  res.set('Content-Type', 'application/json');
  throw new NotFoundError(notFoundErrorMessage);
});

module.exports = routerDefault;
