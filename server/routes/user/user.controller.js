const createAsyncError = require('../../middlewares/createAsyncError');

const register = createAsyncError(async (req, res) => {
    console.log(req.body);
});

module.exports = { register };
