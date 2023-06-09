const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Quest = mongoose.model('Quest');
const Event = mongoose.model('Event');
const { requireUser } = require('../../config/passport');
const Review = require('../../models/Review');
const validateEventInput = require('../../validations/events');

router.get('/:id', async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id)
                                .populate("quest", "_id title description checkpoints duration formattedAddress lat lng radius tags creator imageUrls")
                                .populate("host", "_id email firstName lastName profileImageUrl")
                                .populate("attendees", "_id email firstName lastName profileImageUrl")
        return res.json(event);
    }
    catch(err) {
        const error = new Error('Event not found');
        error.statusCode = 404;
        error.errors = { message: "No event found with that id" };
        return next(error);
    }
})

router.get('/', async (req, res) => {
    try {
        const events = await Event.find()
                                .populate("quest", "_id title description checkpoints duration formattedAddress lat lng radius tags creator imageUrls")
                                .populate("host", "_id email firstName lastName profileImageUrl")
                                .populate("attendees", "_id email firstName lastName profileImageUrl")
                                .sort({createdAt: -1});
        return res.json(events);
    }
    catch(err) {
        return res.json(null);
    }
})

router.post('/', requireUser, validateEventInput, async (req, res, next) => {
    try {
        let attendeeIds = [];
        for (let i = 0; i < req.body.attendees.length; i++) {
            let user = await User.findOne({email: req.body.attendees[i]});
            attendeeIds.push(user._id)
        }
        const newEvent = new Event({
            quest: req.body.quest,
            host: req.user._id,
            attendees: attendeeIds,
            startTime: req.body.startTime
        })
        let event = await newEvent.save();
        event = await event.populate("host", "_id email firstName lastName profileImageUrl");
        event = await event.populate("attendees", "_id email firstName lastName");
        event = await event.populate("quest", "_id title description checkpoints duration formattedAddress lat lng radius tags creator imageUrls")
        return res.json(event);
    }
    catch(err) {
        next(err);
    }
})

router.patch('/:id', requireUser, validateEventInput, async (req, res, next) => {
    try {
        const updateEvent = await Event.findById(req.params.id);

        if ((JSON.stringify(req.user._id)) !== (JSON.stringify(updateEvent.host))) {
            throw new Error("Cannot update this event");
        }

        let attendeeIds = [];
        for (let i = 0; i < req.body.attendees.length; i++) {
            let user = await User.findOne({email: req.body.attendees[i]});
            attendeeIds.push(user._id)
        }
        updateEvent.quest = req.body.quest;
        updateEvent.host = req.user._id;
        updateEvent.attendees = attendeeIds;
        updateEvent.startTime = req.body.startTime;

        let event = await updateEvent.save();
        event = await event.populate("host", "_id email firstName lastName");
        event = await event.populate("attendees", "_id email firstName lastName");
        event = await event.populate("quest", "_id title description checkpoints duration formattedAddress lat lng radius tags creator imageUrls")
        return res.json(event);
    }
    catch(err) {
        next(err);
    }
})

router.delete('/:id', requireUser, async (req, res, next) => {
    try {
        const deleteEvent = await Event.findById(req.params.id);

        if ((JSON.stringify(req.user._id)) !== (JSON.stringify(deleteEvent.host))) {
            throw new Error("Cannot delete this event");
        }
        deleteEvent.deleteOne();
        return res.json(deleteEvent);
    }
    catch(err) {
        next(err);
    }
});

module.exports = router;