const mongoose = require('mongoose');

const contributorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  contributions: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: true,
    unique: true,
  },
});
const Contributor = mongoose.model('Contributor', contributorSchema);

module.exports = Contributor;
