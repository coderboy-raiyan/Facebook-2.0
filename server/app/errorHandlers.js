const ErrorHandler = require('../utils/errorHandler');

function notFound(req, res, next) {
    return next(new ErrorHandler('Resource not found', 404));
}
function globalErrorHandler(error, req, res, next) {
    error.message = error.message || 'Internal Server Error';
    error.statusCode = error.statusCode || 500;

    return res.status(error.statusCode).json({ success: false, message: error.message });
}

module.exports = { notFound, globalErrorHandler };
