const Contributor = require('../models/Contributor');

async function getContributors(ctx) {
  const contributors = await Contributor.find();
  ctx.body = contributors;
}

module.exports = {
  getContributors,
};
