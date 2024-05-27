'use strict';
const errorCacther = (func) => async (req, res, next) => {
    try {
        await func(req, res, next);
    } catch (error) {
        next(error);
    }
};

module.exports = errorCacther;