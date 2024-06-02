'use strict';

const SQLRepo = require('../Repository');
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

    static async SignOut(req, res, next) {
        /* Clear cookie */
        res.clearCookie('access-token');
        res.clearCookie('refresh-token');
        res.clearCookie('user-id');

        /* Delete token from database */
        await SQLRepo.deleteOne({
            where: {
                user_id: req.clientID,
            },

            modelName: 'Token',
        });

        /* Redirect to logjn */
        return res.redirect('http://localhost:6868/login');
    }

    static async getUser(req, res, next) {
        res.status(200).json({
            status: 200,
            code: 200,
            body: await SQLRepo.findOne({
                where: {
                    id: req.clientID || '113396267234976612415',
                },

                modelName: 'User',
            }),
            message: 'Have got user information successfully',
        });
    }
}

module.exports = AuthController;
