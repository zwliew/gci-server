const Router = require('koa-router');
const repos = require('./repos');
const contributors = require('./contributors');

const router = new Router({
  prefix: '/api',
});

router.use(repos.routes());
router.use(contributors.routes());

module.exports = router;
