const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const NUM_SEED_USERS = 5;

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
      profileImageUrl: "https://magellan-dev.s3.amazonaws.com/mag_orange_small.png"
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
    console.log("Resetting db and seeding users...");
    
    User.collection.drop()
                    .then(() => User.insertMany(users))
                    .then(() => {
                        console.log("Done!");
                        mongoose.disconnect();
                    })
                    .catch(err => {
                        console.error(err.stack);
                        process.exit(1);
                    });
}