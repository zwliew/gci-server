const Repository = require('../models/Repository');

async function getRepositories(ctx) {
  const repositories = Repository.find();
  ctx.body = repositories;
}

module.exports = {
  getRepositories,
};
