const routerArticles = require('express').Router();

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

routerArticles.get('/articles', getArticles);
routerArticles.post('/articles', createArticle); // здесь нужна валидация переданных данных
routerArticles.delete('/articles', deleteArticle);

module.exports = routerArticles;
