/* eslint-disable no-new */
const createAsyncError = require('../../middlewares/createAsyncError');
const UserModel = require('../../model/User.model');
const ErrorHandler = require('../../utils/errorHandler');

const register = createAsyncError(async (req, res, next) => {
    const user = await new UserModel(req.body).save();
    return res.status(200).json({ success: true, user });
});

module.exports = { register };
