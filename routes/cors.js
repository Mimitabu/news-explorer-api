const routerCors = require('express').Router();

// Массив разешённых доменов
const allowedCors = [
  'http://localhost:8080/',
];

routerCors.use((req, res, next) => {
  const { origin } = req.headers;
  // Записываем в переменную origin соответствующий заголовок
  // Проверяем, что значение origin есть среди разрешённых доменов
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
});

module.exports = routerCors;

// const whitelist = ['http://localhost:8080', 'http://news-explorer.pw'];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };

// module.exports = corsOptions;
