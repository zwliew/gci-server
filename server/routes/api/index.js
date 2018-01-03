const Router = require('koa-router');
const repositories = require('./repositories');
const contributors = require('./contributors');

const router = new Router({
  prefix: '/api',
});

router.use(repositories.routes());
router.use(contributors.routes());

module.exports = router;
