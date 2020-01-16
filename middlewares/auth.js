const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const key = require('../key');
const UnauthorizedError = require('../errors/unauthorized-error');
const { loginErrorMessage } = require('../messagesData');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(loginErrorMessage);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : key);
  } catch (err) {
    throw new UnauthorizedError(loginErrorMessage);
  }

  req.user = payload;

  return next();
};
