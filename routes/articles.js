const routerArticles = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

routerArticles.get('/articles', getArticles);
routerArticles.post('/articles', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2),
    title: Joi.string().required().min(2),
    text: Joi.string().required().min(2),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required(),
    image: Joi.string().required(),
  }),
}), createArticle); // здесь нужна валидация переданных данных
routerArticles.delete('/articles', deleteArticle);

module.exports = routerArticles;
