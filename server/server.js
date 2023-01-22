const http = require('http');
const app = require('./app/app');
const connectDb = require('./config/db');

const PORT = process.env.PORT || 5000;
require('dotenv').config();

connectDb();

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log('listening on PORT...');
});
