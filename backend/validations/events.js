const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateEventInput = [
    check('attendees')
        .isArray()
        .withMessage('Event must include attendees'),
    check('startTime')
        .exists({ checkFalsy: true }).withMessage('Must include start date')
        .isISO8601()
        .withMessage('Date must be valid'),
  handleValidationErrors
];

module.exports = validateEventInput;