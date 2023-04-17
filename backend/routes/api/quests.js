const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Quest = mongoose.model('Quest');
const { requireUser } = require('../../config/passport');
const validateQuestInput = require('../../validations/quests');

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
    debugger
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

module.exports = router;