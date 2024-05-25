'use strict';

const { formatGrammarCheckingResult } = require('../utils');
const {
    OPENAI_INVALID_API_KEY,
    OPENAI_OUT_OF_TOKEN,
} = require('../utils/code');
const ErrorResponse = require('../utils/error.response');

const FUNCTION_CALLING = {
    GRAMMAR_CHECKER: {
        name: 'correct_english_grammar',
        description:
            'Correct English grammar errors based on the provided paragraph',
        parameters: {
            type: 'object',
            properties: {
                paragraph: {
                    type: 'string',
                    description: 'The provided paragraph',
                },
                errors: {
                    type: 'array',
                    description: 'An array of objects representing errors',
                    items: {
                        type: 'object',
                        properties: {
                            word: {
                                type: 'string',
                                description: 'The incorrect word',
                            },
                            suggestion: {
                                type: 'string',
                                description:
                                    'The suggested replacement for the error word',
                            },
                        },
                        required: ['word', 'suggestion'],
                    },
                },
            },
            required: ['errors'],
        },
    },

    TEXT_COMPLETION_BY_SENTENCE: {
        name: 'text_completion',
        description:
            'Given an English sentence as input, You are tasked with completing the text based on the context provided in that sentence.',
        parameters: {
            type: 'object',
            properties: {
                sentence: {
                    type: 'string',
                    description: 'The provided sentence',
                },
                completions: {
                    type: 'array',
                    description:
                        'An array of suggested replacements for the sentence. The length of array should be greater than 3',
                    items: {
                        type: 'string',
                        description:
                            'The suggested replacement for the sentence. The replacement should be at least 18 words',
                    },
                },
            },
            required: [],
        },
    },

    TEXT_COMPLETION_BY_PARAGRAPH: {
        name: 'text_completion',
        description:
            'Given an English paragraph as input, You are tasked with completing the text based on the context provided in that paragraph.',
        parameters: {
            type: 'object',
            properties: {
                paragraph: {
                    type: 'string',
                    description: 'The provided paragraph',
                },
                completions: {
                    type: 'array',
                    description:
                        'An array of suggested replacements for the paragraph. The length of array should be greater than 3',
                    items: {
                        type: 'string',
                        description:
                            'The suggested replacement for the paragraph. The replacement should be at least 18 words',
                    },
                },
            },
            required: [],
        },
    },
};

const openAI = require('../config')('DEV').openai;

class OpenAIService {
    static async checkGrammar({ paragraph }) {
        /* Promt */
        const messages = [
            {
                role: 'user',
                content: `The provided paragraph: "${paragraph}"`,
            },
        ];

        /* Function calling  */
        const FunctionCalling = [
            {
                type: 'function',
                function: FUNCTION_CALLING.GRAMMAR_CHECKER,
            },
        ];

        /* Request configuration */
        const requestConfiguration = {
            model: 'gpt-3.5-turbo',
            messages: messages,
            tools: [...FunctionCalling],
            tool_choice: 'auto',
            temperature: 0.7,
        };

        /* Send request */
        const response = await fetch(
            'https://api.openai.com/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${openAI.apiKey}`,
                },
                body: JSON.stringify(requestConfiguration),
            }
        );

        const data = await response.json();

        if (data.error) {
            if (data.error.type === 'insufficient_quota') {
                throw new ErrorResponse({
                    message: 'Out of money',
                    code: OPENAI_OUT_OF_TOKEN,
                });
            }

            throw new ErrorResponse({
                message: 'Some error happended with OpenAI API',
                code: 20024,
            });
        }

        const AIResponse = data.choices[0];
        const checkingResult =
            AIResponse.message.tool_calls[0].function.arguments;

        /* Format reuslt and return */
        return formatGrammarCheckingResult({
            result: JSON.parse(checkingResult),
        });
    }

    static async paraphrase({ form = 'shorten', paragraph }) {
        const len = form === 'shorten' ? 'shorter' : 'longer';
        /* Promt */
        const messages = [
            {
                role: 'system',
                content: `You will receive an English paragraph, and your task is to rewrite this paragraph, ensuring that the rewritten version is ${len} than the original.`,
            },
            {
                role: 'user',
                content: paragraph,
            },
        ];

        /* Request configuration */
        const requestConfiguration = {
            model: 'gpt-3.5-turbo',
            messages: messages,
            temperature: 0.7,
            max_tokens: 500,
        };

        /* Send request */
        const response = await fetch(
            'https://api.openai.com/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${openAI.apiKey}`,
                },
                body: JSON.stringify(requestConfiguration),
            }
        );

        const data = await response.json();

        if (data.error) {
            if (data.error.type === 'insufficient_quota') {
                throw new ErrorResponse({
                    message: 'Out of money',
                    code: OPENAI_OUT_OF_TOKEN,
                });
            }

            throw new ErrorResponse();
        }

        const paraphrasedPara = data.choices[0].message.content;
        return paraphrasedPara;
    }

    static async textCompletion({ text, inputFormat }) {
        /* Promt */
        const messages = [
            {
                role: 'user',
                content: `The provided ${inputFormat}: "${text}"`,
            },
        ];

        /* Function calling  */
        const FunctionCalling = [
            {
                type: 'function',
                function:
                    inputFormat === 'paragraph'
                        ? FUNCTION_CALLING.TEXT_COMPLETION_BY_PARAGRAPH
                        : TEXT_COMPLETION_BY_SENTENCE,
            },
        ];

        /* Request configuration */
        const requestConfiguration = {
            model: 'gpt-3.5-turbo',
            messages: messages,
            tools: [...FunctionCalling],
            tool_choice: 'auto',
            temperature: 0.7,
        };

        /* Send request */
        const response = await fetch(
            'https://api.openai.com/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${openAI.apiKey}`,
                },
                body: JSON.stringify(requestConfiguration),
            }
        );

        const data = await response.json();

        if (data.error) {
            if (data.error.type === 'insufficient_quota') {
                throw new ErrorResponse({
                    message: 'Out of money',
                    code: OPENAI_OUT_OF_TOKEN,
                });
            }

            throw new ErrorResponse();
        }

        const AIResponse = data.choices[0];
        const checkingResult =
            AIResponse.message.tool_calls[0].function.arguments;

        /* Format reuslt and return */
        return JSON.parse(checkingResult);
    }
}

module.exports = OpenAIService;
