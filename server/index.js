const Koa = require('koa');
const api = require('./routes/api');

const app = new Koa();
app.use(api.routes());

module.exports = app;
