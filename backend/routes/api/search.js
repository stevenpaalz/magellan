const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Quest = mongoose.model('Quest');

router.get('/', async (req, res) => {
    try {
        const search = req.query.s.toLowerCase();
        const quests = await Quest.find()
            .populate("creator", "_id email firstName lastName profileImageUrl")
            .sort({createdAt: -1});
        if (!search) {
            return res.json(quests);
        }
        const filteredQuests = [];
        quests.forEach((quest) => {
            if (quest.title.toLowerCase().includes(search) ||
            quest.description.toLowerCase().includes(search) ||
            quest.formattedAddress.toLowerCase().includes(search)) {
                filteredQuests.push(quest);
            }
        })
        return res.json(filteredQuests);
    }
    catch(err) {
        return res.json([]);
    }
})

module.exports = router;