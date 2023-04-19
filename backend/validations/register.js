const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateRegisterInput = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Email is invalid'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6, max: 30 })
        .withMessage('Password must be between 6 and 30 characters'),
    check('firstName')
        .exists({checkFalsy: true})
        .withMessage('First name is invalid'),
    check('lastName')
        .exists({checkFalsy: true})
        .withMessage('Last name is invalid'),
    check('homeCity')
        .exists({checkFalsy: true})
        .withMessage('Home city is missing'),
    check('homeState')
        .exists({checkFalsy: true})
        .withMessage('Home state is missing'),
    check('profileImageUrl')
        .exists({checkFalsy: true})
        .withMessage('Must select profile image'),
  handleValidationErrors
];

module.exports = validateRegisterInput;