const { check } = require("express-validator");
const Quest = require("../models/Quest");
const handleValidationErrors = require('./handleValidationErrors');

const uniqueTitle = async (value, {req}) => {
    const quest = await Quest.findOne({ title: value})
    if (quest) {
        throw new Error('Title must be unique, please use a different one')
    }
    return true;
}

exports.validateQuestInput = [
    check('title')
        .exists({ checkFalsy: true }).withMessage('Quest must have a title')
        .custom(uniqueTitle),
    check('description')
        .exists({checkFalsy: true}).withMessage('Quest must have a description'),
    check('duration')
        .exists({checkFalsy: true}).withMessage('Quest must have a duration')
        .isFloat({min: 0}).withMessage('Duration must be greater than 0 hours'),
    check('radius')
        .exists({checkFalsy: true}).withMessage('Quest must have a radius')
        .isFloat({min: 0}).withMessage('Radius must be greater than 0 hours'),
    check('streetAddress')
        .exists({checkFalsy: true}).withMessage("Missing street address"),
    check('city')
        .exists({checkFalsy: true}).withMessage("Missing city field"),
    check('state')
        .exists({checkFalsy: true}).withMessage("Missing state field"),
    check('zipcode')
        .isLength(5).withMessage("Invalid zipcode")
        .exists({checkFalsy: true}).withMessage("Missing zipcode field"),
    handleValidationErrors
];
  
exports.validateQuestUpdate = [
    check('title')
        .exists({ checkFalsy: true }).withMessage('Quest must have a title'),
    check('description')
        .exists({checkFalsy: true}).withMessage('Quest must have a description'),
    check('duration')
        .exists({checkFalsy: true}).withMessage('Quest must have a duration')
        .isFloat({min: 0}).withMessage('Duration must be greater than 0 hours'),
    check('radius')
        .exists({checkFalsy: true}).withMessage('Quest must have a radius')
        .isFloat({min: 0}).withMessage('Radius must be greater than 0 hours'),
    check('streetAddress')
        .exists({checkFalsy: true}).withMessage("Missing street address"),
    check('city')
        .exists({checkFalsy: true}).withMessage("Missing city field"),
    check('state')
        .exists({checkFalsy: true}).withMessage("Missing state field"),
    check('zipcode')
        .isLength(5).withMessage("Invalid zipcode")
        .exists({checkFalsy: true}).withMessage("Missing zipcode field"),
    handleValidationErrors
];