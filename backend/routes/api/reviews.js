const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Quest = mongoose.model('Quest');
const Review = mongoose.model('Review');
const { requireUser } = require('../../config/passport');

router.get("/", async (req, res, next) => {
    try {
        const reviews = await Review.find()
                                    .populate("author", "_id firstName lastName")
                                    .sort({createdAt: -1});
        return res.json(reviews);
    }
    catch(err) {
        return res.json([]);
    }
})



module.exports = router;