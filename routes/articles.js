const routerArticles = require('express').Router();
const { postAritcleValidation } = require('../validation');

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

routerArticles.get('/articles', getArticles);
routerArticles.post('/articles', postAritcleValidation, createArticle);
routerArticles.delete('/articles/:articleId', deleteArticle);

module.exports = routerArticles;
