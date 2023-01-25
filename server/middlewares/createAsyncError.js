function createAsyncError(theFun) {
    return function (req, res, next) {
        Promise.resolve(theFun(req, res, next)).catch(next);
    };
}

module.exports = createAsyncError;
