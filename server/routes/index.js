const router = require('express').Router();
const userRouter = require('./auth/auth.router');

router.use('/auth', userRouter);

module.exports = router;
