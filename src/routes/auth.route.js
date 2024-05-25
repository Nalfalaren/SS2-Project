'use strict';
const express = require('express');
const authRouter = express.Router();
const AuthController = require('../controllers/auth.controller');
const errorCacther = require('../utils/error-catcher');

authRouter.post(
    '/oauth/sign-in',
    errorCacther(AuthController.SignInByOauth)
);

module.exports = authRouter;
