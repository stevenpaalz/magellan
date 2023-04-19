const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const Quest = require("../models/Quest.js");
const Review = require('../models/Review.js');

const seedQuests = async () => {

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
      "food-and-drink",
      "landmarks",
      "locals-only"
    ],
    creator: demo._id,
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
          "food-and-drink",
          "transportation",
          "obscure"
      ],
      creator: demo._id,
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
        "tourist-traps",
        "landmarks",
        "family-friendly"
    ],
    creator: jamie._id,
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
        "landmarks",
        "tourist-traps"
    ],
    creator: demo._id,
    imageUrls: ["https://magellan-seeds.s3.amazonaws.com/Times-Square-New-York-City.jpeg"],
  })
);

quests.push(
  new Quest({
    title: "Walkin' around Williamsburg",
    description: "Put on your walking shoes and get ready for an adventure through one of New York's most vibrant neighborhoods. McCarren Park, to the Williamsburg bridge, and everything in between.",
    checkpoints: [
        "Have a drink at a rooftop bar with a view of the city",
        "Find country music at a famous bar in the neighborhood",
        "Take a selfie in front of a vintage clothing store",
        "Grab a pint at one of the many breweries in the neighborhood",
        "Get something to eat at a food truck. Bonus points if you find tacos"
    ],
    duration: 2.5,
    formattedAddress: "110 N 3rd St, Brooklyn, NY 11249",
    lat: 40.71641322956318, 
    lng: -73.96158852691455,
    radius: 4,
    tags: [
        "food-and-drink",
        "locals-only",
        "green"
    ],
    creator: steve._id,
    imageUrls: ["https://magellan-seeds.s3.amazonaws.com/Domino-Park-Williamsburg-waterfront-Brooklyn-NYC.jpg"]
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
        "food-and-drink",
        "locals-only",
        "obscure"
    ],
    creator: yong._id,
    imageUrls: ["https://magellan-seeds.s3.amazonaws.com/Flushing.jpg"]
  })
);

const insertSeeds = () => {
    console.log("Resetting db and seeding quests...");
    
    Quest.collection.drop()
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

insertSeeds();
}

seedQuests();