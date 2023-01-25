const app = require('express')();
const { notFound, globalErrorHandler } = require('./errorHandlers');
const middlewares = require('./middlewares');
const routes = require('./routes');

// middlewares
app.use(middlewares);

// Routes
app.use('/api/v1', routes);

// Error Handlers
app.use([notFound, globalErrorHandler]);

module.exports = app;
