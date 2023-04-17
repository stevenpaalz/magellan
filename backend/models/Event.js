const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    host: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    attendees: [
        {type: Schema.Types.ObjectId, 
        ref: 'User'}
    ],
    startTime: {
        type: Date,
        required: true
    },
    quest: {
        type: Schema.Types.ObjectId,
        ref: 'Quest'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);