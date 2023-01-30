const userRouter = require('express').Router();
const { register, activateAccount, login } = require('./user.controller');

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/activate', activateAccount);

module.exports = userRouter;
