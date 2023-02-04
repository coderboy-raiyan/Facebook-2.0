const userRouter = require('express').Router();
const { register, activateAccount, login, refresh, logout } = require('./auth.controller');

userRouter.post('/register', register);
userRouter.get('/refresh', refresh);
userRouter.post('/login', login);
userRouter.post('/logout', logout);
userRouter.post('/activate', activateAccount);

module.exports = userRouter;
