const bcrypt = require('bcryptjs');
const { generateToken } = require('../../libs/jwt');
const createAsyncError = require('../../middlewares/createAsyncError');
const UserModel = require('../../model/User.model');
const ErrorHandler = require('../../utils/errorHandler');
const { validateEmail, validateLength, validateUsername } = require('../../utils/validation');

// @desc Register user
// @routes POST - /api/v1/user/register

const register = createAsyncError(async (req, res, next) => {
    const { first_name, last_name, email, password, gender, bYear, bMonth, bDay } = req.body;

    if (!validateEmail(email)) {
        return next(new ErrorHandler('Invalid email address!!', 400));
    }

    const check = await UserModel.findOne({ email });

    if (check) {
        return next(
            new ErrorHandler(
                'This email address is already exists, try with a different email address',
                400,
            ),
        );
    }

    if (!validateLength(first_name, 3, 30)) {
        return next(new ErrorHandler('First name must between 3 to 30 characters', 400));
    }
    if (!validateLength(last_name, 3, 30)) {
        return next(new ErrorHandler('Last name must between 3 to 30 characters', 400));
    }
    if (!validateLength(password, 6, 40)) {
        return next(new ErrorHandler('Password must be al least 6 characters', 400));
    }

    const cryptedPassword = await bcrypt.hash(password, 10);

    const generateUsername = first_name.split(' ').join('').trim() + last_name.trim();
    const newUsername = await validateUsername(generateUsername);

    const user = await new UserModel({
        first_name,
        last_name,
        username: newUsername,
        email,
        password: cryptedPassword,
        gender,
        bYear,
        bMonth,
        bDay,
    }).save();

    const emailVerificationToken = generateToken({ _id: user._doc._id }, '30m');

    console.log(emailVerificationToken);

    return res.status(200).json({ success: true, user });
});

module.exports = { register };
