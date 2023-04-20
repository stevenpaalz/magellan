const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Quest = mongoose.model('Quest');
const { requireUser } = require('../../config/passport');
const { getLatLng } = require('../../config/geocode');
const Review = require('../../models/Review');
const { validateQuestInput, validateQuestUpdate} = require('../../validations/quests');
const validateReviewInput = require('../../validations/reviews');
const { multipleFilesUpload, multipleMulterUpload } = require("../../awsS3");

router.get('/:id/reviews', async (req, res) => {
    try {
        const reviews = await Review.find({ quest: req.params.id })
                                    .populate("author", "_id email firstName lastName profileImageUrl")
                                    .sort({createdAt: -1});
        return res.json(reviews);
    }
    catch(err) {
        return res.json(null);
    }
})

router.post('/:id/reviews', requireUser, validateReviewInput, async (req, res, next) => {
    try {
        const newReview = new Review({
            quest: req.params.id,
            author: req.user._id,
            rating: req.body.rating,
            text: req.body.text
        })
        let review = await newReview.save();
        review = await review.populate("author", "_id email firstName lastName profileImageUrl");
        return res.json(review);
    }
    catch(err) {
        next(err);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const quest = await Quest.findById(req.params.id)
                                .populate("creator", "_id email firstName lastName profileImageUrl")
        return res.json(quest);
    }
    catch(err) {
        const error = new Error('Quest not found');
        error.statusCode = 404;
        error.errors = { message: "No quest found with that id" };
        return next(error);
    }
})

router.get('/', async (req, res) => {
    try {
        const quests = await Quest.find()
                                    .populate("creator", "_id email firstName lastName profileImageUrl")
                                    .sort({createdAt: -1});
        return res.json(quests);
    }
    catch(err) {
        return res.json([]);
    }
})

router.post('/', multipleMulterUpload("images"), requireUser, validateQuestInput, async (req, res, next) => {
    const imageUrls = await multipleFilesUpload({ files: req.files, public: true });
    try {
        const formattedAddressInput = `${req.body.streetAddress}, ${req.body.city}, ${req.body.state} ${req.body.zipcode}`;
        const latlng = await getLatLng(formattedAddressInput);
        const latInput = latlng[0];
        const lngInput = latlng[1];
        const newQuest = new Quest({
            title: req.body.title,
            description: req.body.description,
            checkpoints: req.body.checkpoints.split(","),
            duration: req.body.duration,
            formattedAddress: formattedAddressInput,
            lat: latInput,
            lng: lngInput,
            radius: req.body.radius,
            tags: req.body.tags.split(","),
            creator: req.user._id,
            imageUrls
        })

        let quest = await newQuest.save();
        quest = await quest.populate("creator", "_id email firstName lastName profileImageUrl");
        return res.json(quest);
    }
    catch(err) {
        next(err);
    }
})

router.patch('/:id', multipleMulterUpload("images"), requireUser, validateQuestUpdate, async (req, res, next) => {
    const imageUrls = await multipleFilesUpload({ files: req.files, public: true });
    try {
        const updateQuest = await Quest.findById(req.params.id);

        if ((JSON.stringify(req.user._id)) !== (JSON.stringify(updateQuest.creator))) {
            throw new Error("Cannot update this quest");
        }

        const formattedAddressInput = `${req.body.streetAddress}, ${req.body.city}, ${req.body.state} ${req.body.zipcode}`;
        const latlng = await getLatLng(formattedAddressInput);
        const latInput = latlng[0];
        const lngInput = latlng[1];
        updateQuest.title = req.body.title;
        updateQuest.description = req.body.description;
        updateQuest.checkpoints = req.body.checkpoints.split(",");
        updateQuest.duration = req.body.duration;
        updateQuest.formattedAddress = formattedAddressInput;
        updateQuest.lat = latInput;
        updateQuest.lng = lngInput;
        updateQuest.radius = req.body.radius;
        updateQuest.tags = req.body.tags.split(",");
        updateQuest.creator = req.user._id;
        updateQuest.imageUrls = imageUrls;
        let quest = await updateQuest.save();
        return res.json(quest);
    }
    catch(err) {
        next(err);
    }
});

router.delete('/:id', requireUser, async (req, res, next) => {
    try {
        const deleteQuest = await Quest.findById(req.params.id);

        if ((JSON.stringify(req.user._id)) !== (JSON.stringify(deleteQuest.creator))) {
            throw new Error("Cannot delete this quest");
        }
        deleteQuest.deleteOne();
        return res.json(deleteQuest);
    }
    catch(err) {
        next(err);
    }
});

module.exports = router;