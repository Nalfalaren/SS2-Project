'use strict';
const SQLRepo = require('../Repository');
const OpenAIService = require('../services/openai.service');
const GoogleService = require('../services/google.service');
const {
    OPENAI_CHECK_GRAMMAR_SUCCESS,
    CHECK_GRAMMER_MISS_PARAGRAPH,
    OPENAI_PARAPHRASE_SUCCESS,
    OPENAI_TEXT_COMPLETION_SUCCESS,
} = require('../utils/code');
const ErrorResponse = require('../utils/error.response');
const axios = require('axios');
const { extractTextFromHtml, getSimilarity } = require('../utils');

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

        const output = await OpenAIService.checkGrammar({
            text: req.body.text,
        });

        await SQLRepo.createOne({
            props: {
                user_id: req.clientID,
                inputText: req.body.text,
                outputText: JSON.stringify([output.fixedText]),
                type: 'grammar-checking',
            },
            modelName: 'History',
        });

        res.status(200).json({
            status: 200,
            code: OPENAI_CHECK_GRAMMAR_SUCCESS,
            body: output,
            message:
                'Grammar checker has been correct the text input successfully',
        });
    }

    /* Plagiarism Checker */
    static async plagiarismChecker(req, res, next) {
        const output = [];

        /* Google search with query */
        const results = await GoogleService.search({
            query: req.body.text,
        });

        const length = results.length >= 3 ? 3 : results.length;

        for (let i = 0; i < length; i++) {
            const url = results[i].link;
            console.log(url);
            /* Get html from webpage and extract only text*/
            const extractedText = await extractTextFromHtml({
                url,
            });

            /* Get similary */
            const similarity = getSimilarity({
                firstText: req.body.text,
                secondText: extractedText,
            });

            if (similarity != 0) {
                output.push({
                    similarity,
                    link: url,
                });
            }
        }

        return res.json(output);
    }

    /* Text completion */
    static async textCompletion(req, res, next) {
        if (!req.body.text) {
            throw new ErrorResponse({
                message: 'Provide text to complete',
            });
        }

        const output = await OpenAIService.textCompletion({
            text: req.body.text,
        });

        await SQLRepo.createOne({
            props: {
                user_id: req.clientID,
                inputText: output.text,
                outputText: JSON.stringify(output.versions),
                type: 'text-completion',
            },
            modelName: 'History',
        });

        res.status(200).json({
            status: 200,
            code: OPENAI_TEXT_COMPLETION_SUCCESS,
            body: output,
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

        const output = await OpenAIService.paraphrase({
            form: req.body.form,
            text: req.body.text,
        });

        await SQLRepo.createOne({
            props: {
                user_id: req.clientID,
                inputText: output.text,
                outputText: JSON.stringify(output.versions),
                type: 'paraphrase',
            },
            modelName: 'History',
        });

        res.status(200).json({
            status: 200,
            code: OPENAI_PARAPHRASE_SUCCESS,
            body: output,
            message: 'The input text has been paraphrased successfully',
        });
    }
}

module.exports = AssistantController;
