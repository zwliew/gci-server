const dotenv = require('dotenv');

dotenv.config();

const server = require('./server');

server.listen(process.env.PORT);
