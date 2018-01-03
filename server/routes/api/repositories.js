const Router = require('koa-router');
const controller = require('../../controllers/repositories');

const router = new Router({
  prefix: '/repositories',
});

router.get('/', controller.getRepositories);

module.exports = router;
