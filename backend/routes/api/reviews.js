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
                                    .populate("author", "_id firstName lastName profileImageUrl")
                                    .sort({createdAt: -1});
        return res.json(reviews);
    }
    catch(err) {
        return res.json([]);
    }
})

router.delete("/:id", requireUser, async (req, res, next) => {
    try {
        const deleteReview = await Review.findById(req.params.id)

        if ((JSON.stringify(req.user._id)) !== (JSON.stringify(deleteReview.author))) {
            throw new Error("Cannot delete this review");
        }
        deleteReview.deleteOne();
        return res.json(deleteReview)
    }
    catch(err) {
        next(err);
    }
})

module.exports = router;