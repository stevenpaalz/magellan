const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questSchema = new Schema({
        title: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true,
        },
        checkpoints: {
            type: Array,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        },
        radius: {
            type: Numner,
            required: true
        },
        tags: {
            type: Array,
            required: true
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: User
        }
    }, {
        timestamps: true
});

module.exports = mongoose.model('Quest', questSchema);