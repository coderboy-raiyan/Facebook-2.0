const createAsyncError = require('../../middlewares/createAsyncError');
const UserModel = require('../../model/User.model');
const ErrorHandler = require('../../utils/errorHandler');
const { validateEmail } = require('../../utils/validation');

const register = createAsyncError(async (req, res, next) => {
    if (!validateEmail(req.body.email)) {
        return next(new ErrorHandler('Invalid email address!!', 400));
    }

    const user = await new UserModel(req.body).save();
    return res.status(200).json({ success: true, user });
});

module.exports = { register };
