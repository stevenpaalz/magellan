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
    imageUrls: ["https://magellan-dev.s3.amazonaws.com/unionsqnyc-jpg.jpg"]
  })
);

quests.push(
  new Quest({
    title: "Get lost in Chinatown",
      description: "Discover Chinatown like you're from there...",
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
      imageUrls: ["https://magellan-dev.s3.amazonaws.com/njgcailbq4761.jpg"],
  })
);

quests.push(
  new Quest({
    title: "Financial District is Dead",
    description: "Find the bull, find the bear, find dead people everywhere - I mean money, MONEY EVERYWHERE!!! This quest will take you around FiDi and to see the sites from the John Wick movie franchise.",
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
        "landmarks"
    ],
    creator: jamie._id,
    imageUrls: ["https://magellan-dev.s3.amazonaws.com/GettyImages-660180168-1024x683.jpg"],
  })
);

quests.push(
  new Quest({
    title: "Where's the square at Time Square?",
    description: "Find out what's at Time Square. Check out the (in)famous NYC landmark and be the first in your group to find the typical New York sites. Just don't expect to have the 'local' experience!",
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
    imageUrls: ["https://magellan-dev.s3.amazonaws.com/Times-Square-New-York-City.jpeg"],
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
    imageUrls: ["https://magellan-dev.s3.amazonaws.com/Domino-Park-Williamsburg-waterfront-Brooklyn-NYC.jpg"]
  })
);

quests.push(
  new Quest({
    title: "Flushing, the real Chinatown",
    description: "We are going to find great food and an authentic Chinatown experience",
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
    imageUrls: ["https://magellan-dev.s3.amazonaws.com/Flushing.jpg"]
  })
);

quests.push(
  new Quest({
    title: "Central Park Sculpture Scavenge",
    description: "Spend your day, finding little bits of history preserved in 3 dimensions, in Central Park. This quest is an excellent way to spend a sunny day in the park.",
    checkpoints: [
        "Find The Obelisk, or 'Cleopatra's Needle', the oldest manmade object in Central Park",
        "Find a statue depicting William Shakespeare or one of his works",
        "Find a statue depicting an animal, bonus points for Balto the dog",
        "Throw a penny into one of the park's fountains",
        "Find the Women's Rights Pioneers Monument the first sculpture in central park to depict actual women, unveiled in 2020 🤦‍♂️."
    ],
    duration: 2,
    formattedAddress:"848 Columbus Cir, New York, NY 10019",
    lat: 40.768426341481465,  
    lng: -73.98186262004357,
    radius: 5,
    tags: [
        "public-art",
        "family-friendly",
        "green"
    ],
    creator: dan._id,
    imageUrls: ["https://magellan-dev.s3.amazonaws.com/central-park-new-york-city-WHEREYOU0118-fb2c3b1bf36d40258ec2788145fa5581.jpg"]
  })
);

quests.push(
  new Quest({
    title: "The Bushwick Bohemian",
    description: "Explore the vibrant, up-and-coming neighborhood of Bushwick, NYC! Check out some of the best coffee shops, shopping, and restaurants that Brooklyn has to offer.",
    checkpoints: [
        "Grab a coffee at a brightly-painted coffee shop",
        "Leaf through a new-to-you book in a used book store",
        "Get some pizza at a wood-fired pizza restaurant",
        "Ride a citi-bike or a Revel scooter",
        "Take a selfie with a mural that fills up the entire wall of a multi-story building."
    ],
    duration: 4,
    formattedAddress: "92 Irving Ave, Brooklyn, NY 11237",
    lat: 40.70406607254139,  
    lng: -73.92309052983279,
    radius: 4,
    tags: [
        "food-and-drink",
        "locals-only",
        "public-art"
    ],
    creator: dan._id,
    imageUrls: ["https://magellan-dev.s3.amazonaws.com/wall-of-several-colorful-murals-in-Bushwick.jpg"]
  })
)

quests.push(
  new Quest({
    title: "Metro Mosaic Madness",
    description: "Find some of New York's best underground art (because it's in the subway)! We recommend picking up all-day subway passes for this one. Time to hit the underground.",
    checkpoints: [
        "See some incredibly realistic mosaic portraits at 72nd and 86th street stations.",
        "Enjoy some fun animals at the natural history museum stop.",
        "Smile at a Greyhound in human clothing at 23rd street.",
        "Get your mind blown by Funktional Vibrations at Hudson Yards",
        "Experience some nyc history with the black and white murals of 63rd and Lexington."
    ],
    duration: 5,
    formattedAddress: "100 W 23rd St, New York, NY 10011",
    lat: 40.74291102488633,  
    lng:  -73.99322654026659,
    radius: 6,
    tags: [
        "family-friendly",
        "transportation",
        "public-art"
    ],
    creator: demo._id,
    imageUrls: ["https://magellan-dev.s3.amazonaws.com/shutterstock_722484637.jpg"]
  })
)

quests.push(
  new Quest({
    title: "Manhattan Squared",
    description: "Sometimes it's cool to be square! NY has squares everywhere! Check out some of the main attractions in NYC. Great for those visiting New York for the first time.",
    checkpoints: [
        "Hangout with some NYU students in Washington Square, ask someone what they're majoring in.",
        "Go to a farmer's market tent or watch someone play chess at Union Square.",
        "Find your new favorite billboard at Times Square.",
        "Get a Shake Shack shake and listen to some street performers play in Madison Square.",
        "Think about how many sides a square has at Greeley square and Herald square."
    ],
    duration: 2,
    formattedAddress: "40 Washington Square S, New York, NY 10012",
    lat: 40.730597316430085, 
    lng:  -73.9995980924278,
    radius: 4,
    tags: [
        "green",
        "family-friendly",
        "tourist-traps"
    ],
    creator: demo._id,
    imageUrls: ["https://magellan-dev.s3.amazonaws.com/Washington-Square-Park.jpeg"]
  })
)

quests.push(
  new Quest({
    title: "Speaking Easy in New York City",
    description: "Shhh! Don't tell anyone about these secretive suppliers of cocktail goodness. Enjoy the best of the hidden bars of NYC in this quest.",
    checkpoints: [
        "Have a drink in the subway at Nothing Really Matters, at the 50th St subway station, down the stairs on the downtown 1 line. Enter next to Duane Reade.",
        "Say hi to Mikey at Patent Pending, a bar hidden in the back of Patent Coffee on 27th",
        "Have a stiff drink at The Back Bar at 102 Norfolk St - look for the Lower East Side Toy Company sign, then head through the gate, down the alley, and up the steps. ",
        "Enjoy whimsical decor, (but no photos please!) at Peachy's in Chinatown, at 5 Doyers St, find the glowing neon-pink sign next to Chinese Tuxedo, then head down the stairs.",
        "Checkout 252 Front St in Seaport. Enter the store and head towards the back. Enter what looks like a back-of-the-store storage room. You'll see a sliding door to enter."
    ],
    duration: 3,
    formattedAddress: "306 E 50th St, New York, NY 10017",
    lat: 40.76235676562176, 
    lng: -73.98630570303742,
    radius: 3,
    tags: [
        "locals-only",
        "food-and-drink"
    ],
    creator: demo._id,
    imageUrls: ["https://magellan-dev.s3.amazonaws.com/cocktails.jpeg"]
  })
)

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