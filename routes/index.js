const routerUsers = require('./users');
const routerArticles = require('./articles');
const routerUserAuth = require('./userAuth');
const routerDefault = require('./default');
const routerCors = require('./cors');


module.exports = {
  routerUsers,
  routerArticles,
  routerUserAuth,
  routerDefault,
  routerCors,
};
