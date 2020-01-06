const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

// возвращает все статьи, что есть в базе
const getArticles = (req, res, next) => {
  Article.find({}) // при передаче пустого объекта, без параметров поиска, возвращает все
    .populate('owner')
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

// удаляет статью
const deleteArticle = (req, res, next) => {
  const { _id } = req.user;
  const { articleId } = req.params;

  Article.findOne({ _id: articleId })
    .populate('owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Article not found');
      }
      return article;
    })
    .then((article) => {
      if (String(article.owner._id) === _id) {
        Article.findByIdAndRemove(articleId)
          .then((data) => res.send(data))
          .catch(next);
      } else {
        throw new ForbiddenError('You can only delete your articles');
      }
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
