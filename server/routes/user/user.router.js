const userRouter = require('express').Router();
const { register, activateAccount } = require('./user.controller');

userRouter.post('/register', register);
userRouter.post('/activate', activateAccount);

module.exports = userRouter;
