'use strict';
const UserModel = require('../model/User.model');
const TokenModel = require('../model/Token.model');
const OauthModel = require('../model/Oauth.model');

const MODELS = {
    USER: UserModel,
    TOKEN: TokenModel,
    OAUTH: OauthModel,
};

class SQLRepo {
    static async updateOrCreate({ props, where, modelName }) {
        const Model = MODELS[modelName.toUpperCase()];

        try {
            /* Find the user */
            const existedRecord = await Model.findOne({
                where,
            });

            /* Create a new user */
            if (!existedRecord) {
                return await Model.create(props);
            }

            /* Update the user */
            return await Model.update(props, {
                where: where,
            });
        } catch (error) {
            throw error;
        }
    }

    static async findOne({ where, modelName }) {
        const Model = MODELS[modelName.toUpperCase()];

        return await Model.findOne({
            where,
        });
    }
}

module.exports = SQLRepo;
