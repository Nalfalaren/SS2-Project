'use strict';
const express = require('express');
const authRouter = express.Router();
const AuthController = require('../controllers/auth.controller');
const errorCacther = require('../utils/error-catcher');

const { verifyAuthV1 } = require('../middlewares/verify-auth.middlewar');
const checkOauth = require('../middlewares/check-oauth.middleware');

authRouter.get(
    '/oauth/sign-in',
    errorCacther(AuthController.SignInByOauth)
);

// authRouter.use(errorCacther(verifyAuthV1));

authRouter.post('/oauth/sign-out', errorCacther(AuthController.SignOut));

authRouter.get('/user', errorCacther(AuthController.getUser));

module.exports = authRouter;
