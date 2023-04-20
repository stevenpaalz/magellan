const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateReviewInput = [
    check('text')
        .exists({ checkFalsy: true })
        .withMessage('Review must contain body'),
    check('rating')
        .exists({ checkFalsy: true }).withMessage('Rating is invalid')
        .isFloat({min: 1, max: 5})
        .withMessage('Rating is invalid'),
  handleValidationErrors
];

module.exports = validateReviewInput;