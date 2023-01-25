const createAsyncError = require('../../middlewares/createAsyncError');
const UserModel = require('../../model/User.model');

const register = createAsyncError(async (req, res) => {
    const user = await new UserModel(req.body).save();
    return res.status(200).json({ success: true, user });
});

module.exports = { register };
