const Article = require('../models/article.js');

// возвращает все статьи, что есть в базе
const getArticles = (req, res, next) => {
  Article.find({}) // при передаче пустого объекта, без параметров поиска, возвращает все
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

// cоздает новую статью
const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;

  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.status(201).send({ data: article }))
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  const { _id } = req.user;
  const { articleId } = req.params;

  Article.findOne({ _id: articleId })
    .then((article) => {
      if (!article) {
        throw new //ошибка ненахождения ИМЯ('Article not found');
      }
      return article;
    })
    .then((article) => {
      if (String(article.owner) === _id) {
        Article.findByIdAndRemove(articleId)
          .then((article) => res.send(article))
          .catch(next);
      } else {
        throw new //ошибка доступа('Пользователи могут удалять только свои карточки');
      }
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
