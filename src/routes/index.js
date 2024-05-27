'use strict';
const express = require('express');
const Router = express.Router();

/* Define routes */
Router.use('/api/auth', require('./auth.route'));
Router.use('/api/assistant', require('./assistant.route'));
Router.use('/api/assistant/fake', require('./fake.route'));

/* Init route */
const initRoutes = (app) => {
    app.use(Router);
};

module.exports = initRoutes;
