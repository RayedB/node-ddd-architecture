module.exports = errorHandler;

errorHandler = (err) => {
    if (typeof(err) === 'string') {
        // custom application error
        return {status: 400, message: err};
    }

    if (err.name === 'ValidationError') {
        // mongoose validation error
        return {status: 400, message: err.message};
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return {status: 401, message: 'Invalid Token'};
    }

    // default to 500 server error
    return {status: 500, message: err.message};
}