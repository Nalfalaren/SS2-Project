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
        if (!req.body?.paragraph) {
            throw new ErrorResponse({
                message: 'Please provide the paragraph to check',
                status: 403,
                code: CHECK_GRAMMER_MISS_PARAGRAPH,
            });
        }

        res.status(200).json({
            status: 200,
            code: OPENAI_CHECK_GRAMMAR_SUCCESS,
            body: await OpenAIService.checkGrammar({
                paragraph: req.body.paragraph,
            }),
            message:
                'Grammar checker has been correct the paragraph successfully',
        });
    }

    /* Plagiarism Checker */
    static async plagiarismChecker(req, res, next) {}

    /* Text completion */
    static async textCompletion(req, res, next) {
        if (!req.body.type) {
            throw new ErrorResponse({
                message:
                    'Provide text type (paragraph or sentence) to complete',
            });
        }

        res.status(200).json({
            status: 200,
            code: OPENAI_TEXT_COMPLETION_SUCCESS,
            body: await OpenAIService.textCompletion({
                inputFormat: req.body.type,
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

        if (!req.body?.paragraph) {
            throw new ErrorResponse({
                message: 'Please provide the paragraph to check',
                status: 403,
                code: CHECK_GRAMMER_MISS_PARAGRAPH,
            });
        }

        res.status(200).json({
            status: 200,
            code: OPENAI_PARAPHRASE_SUCCESS,
            body: await OpenAIService.paraphrase({
                form: req.body.form,
                paragraph: req.body.paragraph,
            }),
            message: 'The paragraph has been paraphrased successfully',
        });
    }
}

module.exports = AssistantController;
