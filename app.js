require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');

const mongoose = require('mongoose');

const app = express();

const { PORT = 3000 } = process.env;

const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

mongoose.connect('mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// логгер запросов
app.use(requestLogger);

// аутентификация и авторизация
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

// роуты, защищенные авторизацией
app.use('/', auth, require('./routes/users'));
app.use('/', auth, require('./routes/articles'));

// роут по умолчанию
app.use('*', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.status(404).send({ message: 'The requested resource is not found' });
});

// логгер ошибок
app.use(errorLogger);

// обработчик ошибок celebrate
app.use(errors());

// централизованный обработчик ошибок
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT);
