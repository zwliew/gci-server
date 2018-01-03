const Router = require('koa-router');
const controller = require('../../controllers/contributors');

const router = new Router({
  prefix: '/contributors',
});

router.get('/', controller.getContributors);

module.exports = router;
