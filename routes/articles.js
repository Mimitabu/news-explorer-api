const routerArticles = require('express').Router();
const { postAritcleValidation } = require('../validation');
const auth = require('../middlewares/auth');

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

routerArticles.get('/articles', auth, getArticles);
routerArticles.post('/articles', auth, postAritcleValidation, createArticle);
routerArticles.delete('/articles/:articleId', auth, deleteArticle);

module.exports = routerArticles;
