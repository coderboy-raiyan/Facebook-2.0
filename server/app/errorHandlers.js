const ErrorHandler = require('../utils/errorHandler');

function notFound(req, res, next) {
    return next(new ErrorHandler('Resource not found', 404));
}
function globalErrorHandler(error, req, res, next) {
    error.message = error.message || 'Internal Server Error';
    error.statusCode = error.statusCode || 500;

    // Wrong Mongodb Id error
    if (error.name === 'CastError') {
        error.message = `Resource not found. Invalid: ${error.path}`;
        error.statusCode = 400;
    }

    // Mongoose duplicate key error
    if (error.code === 11000) {
        error.message = `Duplicate ${Object.keys(error.keyValue)} Entered`;
        error.statusCode = 400;
    }

    // Wrong JWT error
    if (error.name === 'JsonWebTokenError') {
        error.message = 'Json Web Token is invalid, Try again ';
        error.statusCode = 400;
    }

    // JWT EXPIRE error
    if (error.name === 'TokenExpiredError') {
        error.message = 'Json Web Token is Expired, Try again ';
        error.statusCode = 400;
    }

    return res.status(error.statusCode).json({ success: false, message: error.message });
}

module.exports = { notFound, globalErrorHandler };
