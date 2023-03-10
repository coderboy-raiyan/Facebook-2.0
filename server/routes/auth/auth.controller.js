const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../../libs/jwt');
const createAsyncError = require('../../middlewares/createAsyncError');
const UserModel = require('../../model/User.model');
const ErrorHandler = require('../../utils/errorHandler');
const { sendVerificationEmail } = require('../../utils/mailer');
const { validateEmail, validateLength, validateUsername } = require('../../utils/validation');

// @desc Register user
// @routes POST - /api/v1/auth/register

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

    const url = `${process.env.BASE_URL}/api/v1/user/activate/${emailVerificationToken}`;
    sendVerificationEmail(user._doc.email, user._doc.first_name, url);

    const token = generateToken({ _id: user._doc._id }, '7h');

    const AccessToken = generateToken({ _id: user._doc._id }, '20d');

    res.cookie('__refresh_token', AccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        path: '/',
        maxAge: 20 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
        success: true,
        message: 'Sign up success. Please activate your email to start',
        user: {
            _id: user._doc._id,
            username: user._doc.username,
            picture: user._doc.picture,
            first_name: user._doc.first_name,
            last_name: user._doc.last_name,
            token,
            verified: user._doc.verified,
        },
    });
});

// @desc Activate user
// @routes POST - /api/v1/auth/activate

const activateAccount = createAsyncError(async (req, res, next) => {
    const { token } = req.body;
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return next(new ErrorHandler(err.message, 403));
        }
        const foundUser = await UserModel.findOne({ _id: decoded._id });

        if (foundUser?.verified) {
            return res
                .status(400)
                .json({ success: false, message: 'This email is already verified' });
        }
        await UserModel.findByIdAndUpdate({ _id: decoded._id }, { verified: true });

        return res
            .status(200)
            .json({ success: true, message: 'Account has been verified Successfully' });
    });
});

// @desc Login user
// @routes POST - /api/v1/auth/login

const login = createAsyncError(async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'This email address that you entered is not connected to an account',
        });
    }

    const checkPassword = await bcrypt.compare(password, user._doc.password);

    if (!checkPassword) {
        return res.status(401).json({
            success: false,
            message: 'Invalid credentials',
        });
    }
    const token = generateToken({ _id: user._doc._id }, '7d');

    const AccessToken = generateToken({ _id: user._doc._id }, '20d');

    res.cookie('__refresh_token', AccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        path: '/',
        maxAge: 20 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
        success: true,
        message: 'Sign in success',
        user: {
            _id: user._doc._id,
            username: user._doc.username,
            picture: user._doc.picture,
            first_name: user._doc.first_name,
            last_name: user._doc.last_name,
            token,
            verified: user._doc.verified,
        },
    });
});

// @desc new refresh token generation
// @routes GET - /api/v1/auth/refresh

const refresh = createAsyncError(async (req, res, next) => {
    const { __refresh_token } = req.cookies;

    if (!__refresh_token) {
        return next(new ErrorHandler('UnAuthorized', 403));
    }
    jwt.verify(__refresh_token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return next(new ErrorHandler('UnAuthorized', 403));
        }
        const check = await UserModel.findOne({ _id: decoded._id });

        if (!check) {
            return next(new ErrorHandler('Forbidden', 402));
        }

        const token = generateToken({ _id: decoded._doc._id }, '7d');

        return res.status(200).json({ success: true, token });
    });
});

// @desc Clear cookie and logout users
// @routes POST - /api/v1/auth/logout

const logout = createAsyncError(async (req, res) => {
    const { __refresh_token } = req.cookies;

    if (!__refresh_token) {
        return res.statusCode(200);
    }

    res.clearCookie('__refresh_token', {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    });

    return res.status(200).json({ success: true, message: 'Logout successfully' });
});

module.exports = { register, activateAccount, login, refresh, logout };
