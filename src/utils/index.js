'use strict';
const JWTDecode = require('jwt-decode');

const decodeJWT = ({ token }) => {
    return JWTDecode.jwtDecode(token);
};

const isExpired = ({ expireIn }) => {
    return expireIn - Math.floor(Date.now() / 1000) <= 0;
};

const formatGrammarCheckingResult = ({ result }) => {
    console.log(result);
    let para = result.originalText;
    const errors = result.errors;

    /**
     * Mark startIndex + endIndex of error word
     *      in the paragraph
     */
    const formatedErrors = [];
    let currentPointerIndex = 0;
    for (let i = 0; i < errors.length; i++) {
        const errorWord = errors[i].word;
        const startPosIndex = para.indexOf(errorWord, currentPointerIndex);
        const endPosIndex = startPosIndex + errorWord.length;

        formatedErrors.push({
            errorWord,
            startPosIndex,
            endPosIndex,
            suggestion: errors[i].suggestion,
        });

        currentPointerIndex = endPosIndex + 1;
    }

    /* Return formatted version of result */
    return {
        originalText: result.originalText,
        fixedText: result.fixedText,
        errorWords: formatedErrors,
    };
};

module.exports = {
    decodeJWT,
    isExpired,
    formatGrammarCheckingResult,
};
