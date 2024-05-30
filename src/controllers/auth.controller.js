'use strict';

const AuthService = require('../services/auth.service');
const {
    OAUTH_SIGN_IN_OK,
    OAUTH_MISS_AUTH_CODE,
} = require('../utils/code');
const ErrorResponse = require('../utils/error.response');

class AuthController {
    static async SignInByOauth(req, res, next) {
        if (req.query?.error || !req.query?.code) {
            return res.redirect('http://localhost:6868/login');
        }

        const { accessToken, refreshToken, user } =
            await AuthService.SignInByOauth({
                oauthCode: req.query.code,
            });

        res.cookie('access-token', accessToken);
        res.cookie('refresh-token', refreshToken);
        res.cookie('user-id', user.id);

        res.redirect('http://localhost:6868/home');
    }
}

module.exports = AuthController;
