'use strict';
const express = require('express');
const assistantRouter = express.Router();
const errorCacther = require('../utils/error-catcher');
const AssistantController = require('../controllers/assistant.controller');

assistantRouter.get(
    '/test',
    errorCacther((req, res, next) => {
        res.send('OK Tesing Writing');
    })
);

assistantRouter.post(
    '/grammar-checker',
    errorCacther(AssistantController.grammarChecker)
);

assistantRouter.post(
    '/paraphrase',
    errorCacther(AssistantController.paraphrase)
);

assistantRouter.post(
    '/text-completion',
    errorCacther(AssistantController.textCompletion)
);

assistantRouter.post(
    '/plagiarism-checker',
    errorCacther(AssistantController.plagiarismChecker)
);

assistantRouter.post('/save', errorCacther(AssistantController.save));

module.exports = assistantRouter;
