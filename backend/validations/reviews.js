const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateReviewInput = [
    check('text')
        .exists({ checkFalsy: true })
        .withMessage('Review body must contain body'),
    check('rating')
        .exists({ checkFalsy: true })
        .isFloat({min: 0, max: 5})
        .withMessage('Rating is invalid'),
  handleValidationErrors
];

module.exports = validateReviewInput;