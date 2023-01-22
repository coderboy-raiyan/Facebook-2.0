const app = require('express')();
const middlewares = require('./middlewares');
const routes = require('./routes');

// middlewares
app.use(middlewares);

// Routes
app.use('/api/v1', routes);

module.exports = app;
