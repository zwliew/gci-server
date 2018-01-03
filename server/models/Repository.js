const mongoose = require('mongoose');

const repositorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  contributors: {
    type: Number,
    required: true,
  },
});
const Repository = mongoose.model('Repository', repositorySchema);

module.exports = Repository;
