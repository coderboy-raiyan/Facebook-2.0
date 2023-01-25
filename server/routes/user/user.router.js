const userRouter = require('express').Router();
const { register } = require('./user.controller');

userRouter.post('/register', register);

module.exports = userRouter;
