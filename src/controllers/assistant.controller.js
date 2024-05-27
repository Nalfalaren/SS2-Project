'use strict';

const OpenAIService = require('../services/openai.service');
const {
    OPENAI_CHECK_GRAMMAR_SUCCESS,
    CHECK_GRAMMER_MISS_PARAGRAPH,
    OPENAI_PARAPHRASE_SUCCESS,
    OPENAI_TEXT_COMPLETION_SUCCESS,
} = require('../utils/code');
const ErrorResponse = require('../utils/error.response');

class AssistantController {
    /* Grammar checker */
    static async grammarChecker(req, res, next) {
        if (!req.body?.text) {
            throw new ErrorResponse({
                message: 'Please provide the text input to check',
                status: 403,
                code: CHECK_GRAMMER_MISS_PARAGRAPH,
            });
        }

        res.status(200).json({
            status: 200,
            code: OPENAI_CHECK_GRAMMAR_SUCCESS,
            body: await OpenAIService.checkGrammar({
                text: req.body.text,
            }),
            message:
                'Grammar checker has been correct the text input successfully',
        });
    }

    /* Plagiarism Checker */
    static async plagiarismChecker(req, res, next) {}

    /* Text completion */
    static async textCompletion(req, res, next) {
        if (!req.body.text) {
            throw new ErrorResponse({
                message: 'Provide text to complete',
            });
        }

        res.status(200).json({
            status: 200,
            code: OPENAI_TEXT_COMPLETION_SUCCESS,
            body: await OpenAIService.textCompletion({
                text: req.body.text,
            }),
            message: 'Has been completed successfully',
        });
    }

    /* Paraphrase */
    static async paraphrase(req, res, next) {
        if (!['shorten', 'expand'].includes(req.body.form)) {
            throw new ErrorResponse({
                message: 'Provide form to paraphrase:: shorten or expand',
            });
        }

        if (!req.body?.text) {
            throw new ErrorResponse({
                message: 'Please provide the input text to check',
                status: 403,
                code: CHECK_GRAMMER_MISS_PARAGRAPH,
            });
        }

        res.status(200).json({
            status: 200,
            code: OPENAI_PARAPHRASE_SUCCESS,
            body: await OpenAIService.paraphrase({
                form: req.body.form,
                text: req.body.text,
            }),
            message: 'The input text has been paraphrased successfully',
        });
    }
}

module.exports = AssistantController;