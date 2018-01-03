const Koa = require('koa');
const mongoose = require('mongoose');
const api = require('./routes/api');
const Service = require('./Service');

mongoose.connect(process.env.MONGODB_URI)
  .catch(() => console.log('Failed to connect to MongoDB database.'));

const app = new Koa();
app.use(api.routes());

const service = new Service();
service.start();

module.exports = app;
