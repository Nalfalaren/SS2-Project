'use strict';

const AuthService = require('../services/auth.service');
const {
    OAUTH_SIGN_IN_OK,
    OAUTH_MISS_AUTH_CODE,
} = require('../utils/code');
const ErrorResponse = require('../utils/error.response');

class AuthController {
    static async SignInByOauth(req, res, next) {
        if (!req.query.code) {
            throw new ErrorResponse({
                message: 'Not provide the authrization code',
                code: OAUTH_MISS_AUTH_CODE,
                status: 400,
            });
        }

        const body = await AuthService.SignInByOauth({
            oauthCode: req.query.code,
        });

        res.status(200).json({
            code: OAUTH_SIGN_IN_OK,
            status: 200,
            body,
        });
    }
}

module.exports = AuthController;
