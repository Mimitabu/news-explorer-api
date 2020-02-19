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

// const whitelist = ['http://localhost:8080', 'http://news-explorer.pw'];
// const corsOptionsDelegate = function (req, callback) {
//   const corsOptions;
//   if (whitelist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false }; // disable CORS for this request
//   }
//   callback(null, corsOptions);// callback expects two parameters: error and options
// };


// app.use(cors(corsOptionsDelegate));

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
