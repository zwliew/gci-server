const Router = require('koa-router');
const controller = require('../../controllers/repos');

const router = new Router({
  prefix: '/repos',
});

router.get('/', controller.getRepos);

module.exports = router;
