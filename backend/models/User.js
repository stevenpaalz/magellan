const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
      type: String,
      required: true
    },
    hashedPassword: {
      type: String,
      required: true
    },
    homeCity: {
      type: String,
      required: true
    },
    homeState: {
      type: String,
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
    profileImageUrl: {
      type: String,
      required: true
    }
  }, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
