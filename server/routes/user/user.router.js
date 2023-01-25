const userRouter = require('express').Router();
const { register } = require('./user.controller');

userRouter.route('/register', register);

module.exports = userRouter;
