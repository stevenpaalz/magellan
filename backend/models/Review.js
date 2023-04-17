const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    quest: {
        type: Schema.Types.ObjectId,
        ref: 'Quest'
    },
    rating: {
        type: Number,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Review', reviewSchema);