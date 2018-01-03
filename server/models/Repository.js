const mongoose = require('mongoose');

const repositorySchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  contributors: Number,
});
const Repository = mongoose.model('Repository', repositorySchema);

module.exports = Repository;
