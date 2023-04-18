const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const Quest = require("../models/Quest.js");

const NUM_SEED_USERS = 5;
const NUM_SEED_QUESTS = 5;

const users = [];

users.push(
    new User ({
      firstName: 'Demo',
      lastName: 'User',
      email: 'demo@email.com',
      hashedPassword: bcrypt.hashSync('password', 10),
      homeCity: "New York",
      homeState: "NY",
      lat: 40.74343509394614,
      lng: -73.98816281069031,
      profileImageUrl: "https://magellan-seeds.s3.amazonaws.com/blank-profile-picture-973460.svg"
    })
)

users.push(
    new User ({
      firstName: 'Steve',
      lastName: 'Paalz',
      email: 'steve@email.com',
      hashedPassword: bcrypt.hashSync('password', 10),
      homeCity: "New York",
      homeState: "NY",
      lat: 40.74343509394614,
      lng: -73.98816281069031,
      profileImageUrl: "https://magellan-seeds.s3.amazonaws.com/blank-profile-picture-973460.svg"
    })
)

users.push(
    new User ({
      firstName: 'Dan',
      lastName: 'Holodak',
      email: 'dan@email.com',
      hashedPassword: bcrypt.hashSync('password', 10),
      homeCity: "New York",
      homeState: "NY",
      lat: 40.74343509394614,
      lng: -73.98816281069031,
      profileImageUrl: "https://magellan-seeds.s3.amazonaws.com/blank-profile-picture-973460.svg"
    })
)

users.push(
    new User ({
      firstName: 'Yong',
      lastName: 'Lin',
      email: 'yong@email.com',
      hashedPassword: bcrypt.hashSync('password', 10),
      homeCity: "New York",
      homeState: "NY",
      lat: 40.74343509394614,
      lng: -73.98816281069031,
      profileImageUrl: "https://magellan-seeds.s3.amazonaws.com/blank-profile-picture-973460.svg"
    })
)

users.push(
    new User ({
      firstName: 'Jamie',
      lastName: 'Burchfield',
      email: 'jamie@email.com',
      hashedPassword: bcrypt.hashSync('password', 10),
      homeCity: "New York",
      homeState: "NY",
      lat: 40.74343509394614,
      lng: -73.98816281069031,
      profileImageUrl: "https://magellan-seeds.s3.amazonaws.com/blank-profile-picture-973460.svg"
    })
)

for (let i = 1; i < NUM_SEED_USERS; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    users.push(
      new User ({
        firstName: firstName,
        lastName: lastName,
        email: faker.internet.email(firstName, lastName),
        hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
        homeCity: "New York",
        homeState: "NY",
        lat: 40.74343509394614,
        lng: -73.98816281069031,
        profileImageUrl: "https://magellan-seeds.s3.amazonaws.com/blank-profile-picture-973460.svg"
      })
    )
}

const demoId = User.findOne({email: "demo@email.com"})._id;
const quests = [];

quests.push(
  new Quest({
    title: "a/A Where?",
    description: "New to a/A? Get yourself familiarize with nearby restaurants and parks to get away from your fellow classmates and instructors",
    checkpoints: [
      "Ask a co-hort mate to explore with you",
      "Find a buddha statue and take a selfie with it",
      "Napkin from a restaurant or bar",
      "Picture with a delivery person P.S. there's a ghost kitchen nearby",
      "Candy from a candy dispenser"
    ],
    duration: 1,
    formattedAddress: "90 5th Ave, New York, NY 10011",
    lat: 40.736351207089385,
    lng: -73.9937814750412,
    radius: 4,
    tags: [
      "Food",
      "Landmarks",
      "a/A"
    ],
    creator: demoId,
    imageUrls: ["https://magellan-seeds.s3.amazonaws.com/unionsqnyc-jpg.jpg"]
  })
);

quests.push(
  new Quest({
    title: "Get lost in Chinatown",
      description: "Discover Chinatown like you're from there or else...",
      checkpoints: [
          "Find a BAO, ask around if you aren't sure",
          "Find a buddha statue and take a selfie with it",
          "Grab a napkin from a restaurant or bar",
          "Take a selfie from a bench at the park",
          "Ask someone for directions to China"
      ],
      duration: 1.5,
      formattedAddress: "115 Canal St, New York, NY 10002",
      lat: 40.714764199093665,
      lng: -73.99140920913186,
      radius: 4,
      tags: [
          "Culture",
          "Food"
      ],
      creator: demoId,
      imageUrls: ["https://magellan-seeds.s3.amazonaws.com/njgcailbq4761.jpg"],
  })
);

quests.push(
  new Quest({
    title: "Financial District is Dead",
    description: "Find the bull, find the bear, find dead people everywhere - I mean money, MONEY EVERYWHERE!!!",
    checkpoints: [
        "Find the Charging Bull and take a selfie with the rear of the bull statue, NOT THE FRONT",
        "Find George Washington",
        "Find money from the ground, keep looking it's Wall Street, you'll find it!",
        "Find 'The Continental', from John Wick movies",
        "Take a selfie with a stock broker at NYSE"
    ],
    duration: 2,
    formattedAddress: "30 Broad St, New York, NY 10004",
    lat: 40.70737192270527,
    lng: -74.01081449917875,
    radius: 1,
    tags: [
        "History",
        "Landmarks"
    ],
    creator: demoId,
    imageUrls: ["https://magellan-seeds.s3.amazonaws.com/GettyImages-660180168-1024x683.jpg"],
  })
);

quests.push(
  new Quest({
    title: "Where's the square at Time Square?",
    description: "Find out what's at Time Square",
    checkpoints: [
        "Find a cart vendor",
        "Find a street performer and take a selfie with them, make sure to tip them",
        "Take a picture of a broadway show poster",
        "Find someone who speaks another language other than english",
        "Eat a pizza/hotdog"
    ],
    duration: 1,
    formattedAddress: "199 W 45th St, New York, NY 10036",
    lat: 40.75821528050223, 
    lng: -73.98531811921835,
    radius: 3,
    tags: [
        "Landmarks",
        "Tourist traps"
    ],
    creator: demoId,
    imageUrls: ["https://magellan-seeds.s3.amazonaws.com/Times-Square-New-York-City.jpeg"],
  })
);

quests.push(
  new Quest({
    title: "Flushing, the real Chinatown",
    description: "We are going to find great food",
    checkpoints: [
        "Find a bubble tea store",
        "Find a dim sum restaurant",
        "Find a hot pot restaurant",
        "Eat some food you've never tried before",
        "Find a toilet and Flush!"
    ],
    duration: 1,
    formattedAddress: "41-16 Main St, Queens, NY 11355",
    lat: 40.757804162027504, 
    lng: -73.82958943271127,
    radius: 4,
    tags: [
        "Food",
        "Culture"
    ],
    creator: demoId,
    imageUrls: ["https://magellan-seeds.s3.amazonaws.com/Flushing.jpg"],
  })
);

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB successfully');
        insertSeeds();
    })
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    });

const insertSeeds = () => {
    console.log("Resetting db and seeding users and quests...");
    
    User.collection.drop()
                    .then(() => User.insertMany(users))
                    .then(() => Quest.collection.drop())
                    .then(() => Quest.insertMany(quests))
                    .then(() => {
                        console.log("Done!");
                        mongoose.disconnect();
                    })
                    .catch(err => {
                        console.error(err.stack);
                        process.exit(1);
                    });
}