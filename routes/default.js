const routerDefault = require('express').Router();
const NotFoundError = require('../errors/not-found-error');
const { notFoundErrorMessage } = require('../messagesData');

routerDefault.use('*', (req, res, next) => {
  res.set('Content-Type', 'application/json');
  next(new NotFoundError(notFoundErrorMessage));
});

module.exports = routerDefault;
