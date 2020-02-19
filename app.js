require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const { errors } = require('celebrate');
const limiter = require('./limiter');

const { PORT = 3000 } = process.env;
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const centraliseErrors = require('./middlewares/centraliseErrors');
const mongodb = require('./mongodb');

const { NODE_ENV, MONGO_DB } = process.env;


mongoose.connect(NODE_ENV === 'production' ? MONGO_DB : mongodb, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors({
  origin: ['http://localhost:8080', 'http://news-explorer.pw'],
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());
app.use(limiter);

// логгер запросов
app.use(requestLogger);

// разрешение некоторых кросс-доменных запросов


// аутентификация и авторизация
app.use('/', routes.routerUserAuth);

// роуты, защищенные авторизацией
app.use('/', routes.routerUsers);
app.use('/', routes.routerArticles);

// роут по умолчанию
app.use('*', routes.routerDefault);

// логгер ошибок
app.use(errorLogger);

// обработчик ошибок celebrate
app.use(errors());

// централизованный обработчик ошибок
app.use(centraliseErrors);

app.listen(PORT);
