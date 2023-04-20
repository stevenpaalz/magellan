// const mongoose = require("mongoose");
// const { mongoURI: db } = require('../config/keys.js');
// const User = require('../models/User');
// const Quest = require('../models/Quest');

// const DEFAULT_PROFILE_IMAGE_URL = 'https://magellan-seeds.s3.amazonaws.com/blank-profile-picture-973460.svg';

// mongoose
//   .connect(db, { useNewUrlParser: true })
//   .then(() => {
//     console.log('Connected to MongoDB successfully');
//     initializeImages();
//   })
//   .catch(err => {
//     console.error(err.stack);
//     process.exit(1);
// });

// const initializeImages = async () => {
//     console.log("Initializing profile avatars...");
//     await User.updateMany({}, { profileImageUrl: DEFAULT_PROFILE_IMAGE_URL });
      
//     console.log("Initializing Tweet image URLs...");
//     await Quest.updateMany({}, { imageUrls: [] });
  
//     console.log("Done!");
//     mongoose.disconnect();
// }