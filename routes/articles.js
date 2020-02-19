const routerArticles = require('express').Router();
const cors = require('cors');
const { postAritcleValidation } = require('../validation');
const auth = require('../middlewares/auth');
const corsOptions = require('./cors');

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

routerArticles.get('/articles', cors(corsOptions), auth, getArticles);
routerArticles.post('/articles', cors(corsOptions), auth, postAritcleValidation, createArticle);
routerArticles.delete('/articles/:articleId', cors(corsOptions), auth, deleteArticle);

module.exports = routerArticles;
