const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const UnauthorizedError = require('../errors/unauthorized-error');
const NotFoundError = require('../errors/not-found-error');
const {
  unauthorizedErrorMessage,
  notFoundErrorMessage,
  authorizedMessage,
} = require('../messages');
const key = require('../key');

const { NODE_ENV, JWT_SECRET } = process.env;

// возвращает информацию о пользователе (email и имя)
const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(notFoundErrorMessage);
      }
      return user;
    })
    .then((user) => res.send({
      email: user.email,
      name: user.name,
    }))
    .catch(next);
};
// создаёт пользователя с переданными в теле email, password и name
const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      _id: user._id,
      email: user.email,
      name: user.name,
    }))
    .catch(next);
};

// проверяет переданные в теле почту и пароль и возвращает JWT
const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(unauthorizedErrorMessage);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(unauthorizedErrorMessage);
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : key,
            { expiresIn: '7d' },
          );
          return res.cookie('jwt', token, {
            maxAge: 604800000,
            httpOnly: true,
            sameSite: true,
          })
            .send({ message: authorizedMessage })
            .end();
        });
    })
    .catch(next);
};

module.exports = {
  getUser,
  createUser,
  login,
};
