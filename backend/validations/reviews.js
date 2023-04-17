const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateReviewInput = [
    check('rating')
        .exists({ checkFalsy: true })
        .isFloat({min: 0, max: 5})
        .withMessage('Rating is invalid'),
    check('text')
        .exists({ checkFalsy: true })
        .withMessage('Review body must contain body'),
  handleValidationErrors
];

module.exports = validateReviewInput;