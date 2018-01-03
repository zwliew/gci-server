const Koa = require('koa');
const mongoose = require('mongoose');
const api = require('./routes/api');

mongoose.connect(process.env.MONGODB_URI)
  .catch(() => console.log('Failed to connect to MongoDB database.'));

const app = new Koa();
app.use(api.routes());

module.exports = app;
