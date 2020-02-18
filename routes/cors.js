const routerCors = require('express').Router();

// Массив разешённых доменов
const allowedCors = [
  'http://news-explorer.pw',
  'localhost:8080',
];

routerCors.use((req, res, next) => {
  const { origin } = req.headers; // Записываем в переменную origin соответствующий заголовок

  // Проверяем, что значение origin есть среди разрешённых доменов
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
});

module.exports = routerCors;