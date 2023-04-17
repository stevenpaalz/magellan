const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Quest = mongoose.model('Quest');
const { requireUser } = require('../../config/passport');
const Review = require('../../models/Review');
const { validateQuestInput, validateQuestUpdate} = require('../../validations/quests');
const validateReviewInput = require('../../validations/reviews');

router.get('/:id/reviews', async (req, res) => {
    try {
        const reviews = await Review.find({ quest: {id:  req.params.id }});
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
            rating: req.params.rating,
            text: req.params.text
        })
        let review = await newReview.save();
        review = await review.populate("author", "_id firstName lastName");
        return res.json(review);
    }
    catch(err) {
        next(err);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const quest = await Quest.findById(req.params.id)
                                .populate("creator", "_id firstName lastName")
        return res.json(quest);
    }
    catch(err) {
        return res.json(null);
    }
})

router.get('/', async (req, res) => {
    try {
        const quests = await Quest.find()
                                    .populate("creator", "_id firstName lastName")
                                    .sort({createdAt: -1});
        return res.json(quests);
    }
    catch(err) {
        return res.json([]);
    }
})

router.post('/', requireUser, validateQuestInput, async (req, res, next) => {
    try {
        const formattedAddressInput = `${req.body.streetAddress}, ${req.body.city}, ${req.body.state} ${req.body.zipcode}`;

        const newQuest = new Quest({
            title: req.body.title,
            description: req.body.description,
            checkpoints: req.body.checkpoints,
            duration: req.body.duration,
            formattedAddress: formattedAddressInput,
            lat: 10,
            lng: 10,
            radius: req.body.radius,
            tags: req.body.tags,
            creator: req.user._id
        })

        let quest = await newQuest.save();
        quest = await quest.populate("creator", "_id firstName lastName");
        return res.json(quest);
    }
    catch(err) {
        next(err);
    }
})

router.patch('/:id', requireUser, validateQuestUpdate, async (req, res, next) => {
    try {
        const formattedAddressInput = `${req.body.streetAddress}, ${req.body.city}, ${req.body.state} ${req.body.zipcode}`;

        const updateQuest = await Quest.findById(req.params.id);

        if ((JSON.stringify(req.user._id)) !== (JSON.stringify(updateQuest.creator))) {
            throw new Error("Cannot update this quest");
        }
        updateQuest.title = req.body.title;
        updateQuest.description = req.body.description;
        updateQuest.checkpoints = req.body.checkpoints;
        updateQuest.duration = req.body.duration;
        updateQuest.formattedAddress = formattedAddressInput;
        updateQuest.lat = 10;
        updateQuest.lng = 10;
        updateQuest.radius = req.body.radius;
        updateQuest.tags = req.body.tags;
        updateQuest.creator = req.user._id;
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