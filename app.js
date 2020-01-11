require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const { errors } = require('celebrate');
const limiter = require('./limiter');

const { PORT = 3000 } = process.env;
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { login, createUser } = require('./controllers/users');
const { routerUsers, routerArticles } = require('./routes/index');
const auth = require('./middlewares/auth');
const { signinValidation, signupValidation } = require('./validation');
const centraliseErrors = require('./middlewares/centraliseErrors');
const { notFoundErrorMessage } = require('./messages');
const mongodb = require('./mongodb');

const { NODE_ENV, MONGO_DB } = process.env;

mongoose.connect(NODE_ENV === 'production' ? MONGO_DB : mongodb, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());
app.use(limiter);

// логгер запросов
app.use(requestLogger);

// аутентификация и авторизация
app.post('/signin', signinValidation, login);
app.post('/signup', signupValidation, createUser);

// роуты, защищенные авторизацией
app.use(auth);
app.use('/', routerUsers, routerArticles);

// роут по умолчанию
app.use('*', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.status(404).send({ message: notFoundErrorMessage });
});

// логгер ошибок
app.use(errorLogger);

// обработчик ошибок celebrate
app.use(errors());

// централизованный обработчик ошибок
app.use(centraliseErrors);

app.listen(PORT);
