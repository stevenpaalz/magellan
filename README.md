# magellan

magellan is a platform for creating, accessing, and partaking in curated scavenger hunts around US cities. 

## Background and Overview

The best way to discover a new city or explore uncharted pockets of your city is on foot. Enter magellan - a platform for creating, accessing, and partaking in curated scavenger hunts across US cities. Whether your looking for a fun afternoon with your family, a sense of adventure with your friends, or a creative team building activity for your workplace, scavenger hunts provide a memorable experience for all, and magellan takes the effort out of planning one for you.

Our advanced platform offers a seamless way to browse for and plan scavenger hunts in your city. Whether you’re looking to build your own or leverage an existing hunt from our crowdsourced database, magellan is a one-stop shop for your next adventure. Our forthcoming mobile platform will allow you to access all the information you need on the go, making it easy to complete challenges and track your real-time progress progress. 

magellan is built using the MERN tech stack, supplemented with libraries to support maps and calendar functionality. 

## Functionality and MVP

************************Core Functionality************************

- User authentication
- CRUD functionality for building scavenger hunts (templates)
- Map functionality for browsing scavenger hunts
- Hunt event functionality, including a detailed hunt event page and calendar functionality for planning scavenger hunt events
- Ability for users to leave reviews of scavenger hunts
- Production README

**Bonus Features**

- Search functionality for browsing scavenger hunts
- Live mobile-first scavenger hunt functionality, including real-time updates on the progress of the hunt and interactive maps

## Technologies and Technical Challenges

Magellan’s back end will use MongoDB to store user data, hunts constructed by users, events saved by challengers, and reviews of hunts.  Magellan will use the Express web application server  framework. React-Redux and Node.js will be used on the front end to interact with users.  

**Backend: MongoDB/Express** 

Data will be stored using MongoDB in a JSON-like structure. Relationships and schema validation between data will be implemented using Mongoose.  Express will be used to setup routes for  communication with frontend.  

Technical Challenges:

- Setting up models/schema/relationships for hunt/events and reviews
- Setting up necessary routes via Express as needed
- CSRF validation and JWT login token validations
- Gathering and seeding adequate data for testing

**Frontend: React/Node.js** 

Hunt data will be fetched from the backend for display for user to view and select.  Forms will be available to create/edit hunts, events, users, and reviews.  

Technical Challenges: 

- Fetching and displaying data from MongoDB
- A filtering system of hunts based on categories and/or tags
- Creating a checkpoint like system during expedition
- Presenting information of hunts in a way to be descriptive for selection but not to reveal too much to spoil the fun

**Library for Google Map - [https://www.npmjs.com/package/google-map-react](https://www.npmjs.com/package/google-map-react)**

Hunts submitted by users will be saved in our backend and be rendered onto Google Map to show starting point of each hunt.  Each hunt data point will include latitude and longitude from the backend for use to populate the marker on the frontend.  

Technical Challenges: 

- Highlight the hunt on the list when the corresponding marker is hover
- Highlight the marker when a hunt is hover from a list
- Rendering the markers on the map with distinctive marker for different hunt category

**Library for calendar - [https://react-day-picker.js.org/](https://react-day-picker.js.org/)** 

To start the hunt expedition (event) we will utilize a calendar API to allow the user to setup the event.  The event can then be shared with other challengers to allow them to join.  

Technical Challenges: 

- Locked user from selecting past dates
- Allow users to select within a reasonable period (1/2 years?)

## Group Members and Work Breakdown

### ********Team********

Dan Holodak - project lead and flex

Yong Lin - flex

Steve Paalz - backend lead

Jamie Burchfield - frontend lead

### Work Breakdown

******************************Friday - Sunday******************************

- Complete MERN tutorials
- Write proposal README
- Plan initial work for the week
- Implement user authorization on database backend

**Monday**

- Meet to discuss plan for week
- Build frontend for user auth
- Connect React-based web application to backend
- Build database on MongoDB for hunts and events

**Tuesday**

- Connect Redux store to backend routes
- Build frontend functionality for hunts feature
- Build frontend functionality for events feature
- Add map feature to frontend
- Add reviews capability to backend

**Wednesday**

- Add reviews feature
- Add filtering capability to listing
- Style elements

**Thursday**

- Add additional seeds
- Polish styling across site
- Add search (maybe?)
- Complete Production README.md

**Bonus**

Live checklist

Mobile friendly