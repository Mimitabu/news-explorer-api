const routerArticles = require('express').Router();
const cors = require('cors');
const { postAritcleValidation } = require('../validation');
const auth = require('../middlewares/auth');


const whitelist = ['http://localhost:8080', 'http://news-explorer.pw'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

routerArticles.get('/articles', cors(corsOptions), auth, getArticles);
routerArticles.post('/articles', cors(corsOptions), auth, postAritcleValidation, createArticle);
routerArticles.delete('/articles/:articleId', cors(corsOptions), auth, deleteArticle);

module.exports = routerArticles;
