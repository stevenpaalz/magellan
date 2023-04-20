const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const Quest = require("../models/Quest.js");
const Review = require('../models/Review.js');
const Event = require('../models/Event.js');

const seedEvents = async () => {

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
      console.log('Connected to MongoDB successfully');
  })

const demo = await User.findOne({email: "demo@email.com"});
const dan = await User.findOne({email: "dan@email.com"});
const steve = await User.findOne({email: "steve@email.com"});
const yong = await User.findOne({email: "yong@email.com"});
const jamie = await User.findOne({email: "jamie@email.com"});

const quests = await Quest.find();
const users = await User.find();

const events = [];

events.push(
    new Event({
        host: demo._id,
        attendees: [steve._id, yong._id],
        quests: quests[5],
        startTime: '2023-04-19T10:00:00Z'
    })
)

events.push(
    new Event({
        host: dan._id,
        attendees: [demo._id, jamie._id, yong._id],
        quests: quests[5],
        startTime: '2023-04-18T10:00:00Z'
    })
)

for (let i = 1; i <= 3; i++) {
    let attendees = [];
    while (attendees.length < 4) {
        let user = users[faker.datatype.number({'min': 0, 'max': users.length - 1 })]
        if (demo._id !== user._id) {
            attendees.push(user._id);
        }
    }
    events.push(
        new Event({
            host: demo._id,
            attendees: attendees,
            quest: quests[i - 1],
            startTime: `2023-05-${faker.datatype.number({'min': 10, 'max': 30})}T${faker.datatype.number({'min': 10, 'max': 21})}:00:00Z`
        })
    )
}

for (let i = 1; i <= 3; i++) {
    let attendees = [];
    while (attendees.length < 5) {
        let user = users[faker.datatype.number({'min': 0, 'max': users.length - 1 })]
        if (dan._id !== user._id) {
            attendees.push(user._id);
        }
    }
    events.push(
        new Event({
            host: dan._id,
            attendees: attendees,
            quest: quests[i],
            startTime: `2023-05-${faker.datatype.number({'min': 10, 'max': 30})}T${faker.datatype.number({'min': 10, 'max': 21})}:00:00Z`
        })
    )
}

const insertSeeds = () => {
    console.log("Resetting db and seeding events...");
    
    Event.collection.drop()
                    .then(() => Event.insertMany(events))
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

seedEvents();