const mongoose = require('mongoose');

const contributorSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  contributions: Number,
  profile: String,
});
const Contributor = mongoose.model('Contributor', contributorSchema);

module.exports = Contributor;
