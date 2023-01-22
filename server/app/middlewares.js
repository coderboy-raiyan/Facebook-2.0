const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');

const middlewares = [
    express.json(),
    cors({ origin: 'http://localhost:3000', credentials: true }),
    cookieParser(),
];

module.exports = middlewares;
