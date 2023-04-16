const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Tweet = require('../models/Tweet');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const NUM_SEED_USERS = 5;

const users = [];

users.push(
    new User ({
      firstName: 'Demo',
      lastName: 'User',
      email: 'demo@email.com',
      hashedPassword: bcrypt.hashSync('password', 10)
    })
)

users.push(
    new User ({
      firstName: 'Steve',
      lastName: 'Paalz',
      email: 'steve@email.com',
      hashedPassword: bcrypt.hashSync('password', 10)
    })
)

users.push(
    new User ({
      firstName: 'Dan',
      lastName: 'Holodak',
      email: 'dan@email.com',
      hashedPassword: bcrypt.hashSync('password', 10)
    })
)

users.push(
    new User ({
      firstName: 'Yong',
      lastName: 'Lin',
      email: 'yong@email.com',
      hashedPassword: bcrypt.hashSync('password', 10)
    })
)

users.push(
    new User ({
      firstName: 'Jamie',
      lastName: 'Burchfield',
      email: 'jamie@email.com',
      hashedPassword: bcrypt.hashSync('password', 10)
    })
)

for (let i = 1; i < NUM_SEED_USERS; i++) {
    users.push(
      new User ({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(firstName, lastName),
        hashedPassword: bcrypt.hashSync(faker.internet.password(), 10)
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
    console.log("Resetting db and seeding users and tweets...");
    
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