'use strict';
const express = require('express');
const app = express();

/* Parser */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Connect to the database */
const DBConnector = require('./helper/db-connector.helper');
const connector = DBConnector.getConnector();
// require('./model/User.model');
// require('./model/Token.model');
// require('./model/Oauth.model');

/* Init routers */
const initRoutes = require('./routes');
initRoutes(app);

/* Catch error */
app.use((error, req, res, next) => {
    res.json({
        message: error?.message || 'Server Internal Error',
        code: error?.code || 500,
        status: error?.status || 500,
    });
});

module.exports = app;
