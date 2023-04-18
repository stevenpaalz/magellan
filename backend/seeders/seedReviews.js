const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const Quest = require("../models/Quest.js");
const Review = require('../models/Review.js');

const seedReviews = async () => {

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
      console.log('Connected to MongoDB successfully');
  })

const demo = await User.findOne({email: "demo@email.com"});
const yong = await User.findOne({email: "yong@email.com"});
const jamie = await User.findOne({email: "jamie@email.com"});
const steve = await User.findOne({email: "steve@email.com"});
const dan = await User.findOne({email: "dan@email.com"});
const quests = await Quest.find();
const reviewers = [demo, yong, jamie, dan];

const reviews = [];

const badReviews = ["The scavenger hunt was a total letdown. The clues were too easy and the locations we visited were nothing special. I wouldn't recommend it.",
"The scavenger hunt was poorly organized and the clues didn't make sense. We wasted a whole day and didn't even have any fun.",
"This scavenger hunt was a complete disaster. The locations were crowded and the clues were impossible to solve. Save your money and skip this one.",
"The scavenger hunt was a huge disappointment. The team-building activities were boring and the overall experience was underwhelming.",
"I was really looking forward to this scavenger hunt, but it was a huge letdown. The clues were confusing and the locations we visited were lackluster."
];

const goodReviews = ["This was by far the best scavenger hunt I've ever been on! The clues were challenging and fun, and the locations we visited were absolutely stunning.",
"The scavenger hunt was a great way to explore NYC with friends. The clues were cleverly designed and the team-building activities were a blast.",
"I can't recommend this scavenger hunt enough! It was so much fun exploring different parts of the city and solving puzzles with my team.",
"The scavenger hunt was a perfect way to spend a day in NYC. We got to see so many amazing sights and learn so much about the city's history and culture.",
"The scavenger hunt was well-organized and kept us engaged throughout the day. It was a great way to explore NYC with my family.",
"This scavenger hunt was such a unique and exciting way to explore the city. I loved solving the puzzles and discovering hidden gems in different neighborhoods.",
"The scavenger hunt was so much fun and the clues were challenging enough to keep us engaged. We had a great time exploring NYC and solving the puzzles.",
"This scavenger hunt was a great way to spend a day in the city with my friends. We had a lot of laughs and learned so much about different neighborhoods.",
"The scavenger hunt was a fantastic way to see different parts of the city and learn about NYC's history. Highly recommended!",
"The scavenger hunt was a great way to bond with my colleagues outside of work. The challenges were well-designed and kept us entertained all day."
]

badReviews.forEach((review, idx) => {
    reviews.push(
        new Review({
            author: steve._id,
            quest: quests[idx]._id,
            rating: faker.datatype.number({'min': 0, 'max': 3}),
            text: review
        })
    )
})

goodReviews.forEach((review, idx) => {
    reviews.push(
        new Review({
            author: reviewers[(idx % reviewers.length)]._id,
            quest: quests[(idx % quests.length)]._id,
            rating: faker.datatype.number({'min': 3, 'max': 5}),
            text: review
        })
    )
})

const insertSeeds = () => {
    console.log("Resetting db and seeding reviews...");
    
    Review.collection.drop()
                    .then(() => Review.insertMany(reviews))
                    .then(() => {
                        console.log("Done!");
                        mongoose.disconnect();
                    })
                    .catch(err => {
                        console.error(err.stack);
                        process.exit(1);
                    });
}

insertSeeds();
}

seedReviews();