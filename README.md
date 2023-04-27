# magellan

magellan is a platform for creating, accessing, and partaking in curated scavenger hunts (quests) around US cities. 

## [Access the Live Link](https://magellan-wpae.onrender.com/)

## Background and Overview!

The best way to discover a new city or explore uncharted pockets of your city is on foot. Enter magellan - a platform for creating, accessing, and partaking in curated scavenger hunts (quests) across US cities. Whether your looking for a fun afternoon with your family, a sense of adventure with your friends, or a creative team building activity for your workplace, quests provide a memorable experience for all, and magellan takes the effort out of planning one for you.

Our advanced platform offers a seamless way to browse for and plan quests in your city. Whether you’re looking to build your own or leverage an existing quest from our crowdsourced database, magellan is a one-stop shop for your next adventure. Our forthcoming mobile platform will allow you to access all the information you need on the go, making it easy to complete challenges and track your real-time progress progress. 

magellan is built using the MERN tech stack, supplemented with libraries to support maps and calendar functionality. 

<img width="1790" alt="Screen Shot 2023-04-24 at 12 19 44 AM" src="https://user-images.githubusercontent.com/47993465/233991680-e77b80ee-cb7f-4447-afac-c9a583525b5e.png">

<img width="1790" alt="Screen Shot 2023-04-24 at 12 20 30 AM" src="https://user-images.githubusercontent.com/47993465/233991782-3bb05377-0f5c-49e3-a9c4-b72cca200591.png">



## Functionality and MVP

************************Core Functionality************************

- User authentication
- CRUD functionality for building scavenger hunts (quests)
- Map functionality for browsing quests
- Quest event functionality, including a detailed event page and calendar functionality for planning events
- Ability for users to leave reviews of quests
- Production README

**Bonus Features**

- Search functionality for browsing quests
- Live mobile-first scavenger quest functionality, including real-time updates on the progress of the quest


## Technologies and Technical Challenges

Magellan’s back end will use MongoDB to store user data, quests constructed by users, events saved by challengers, and reviews of quests.  Magellan will use the Express web application server framework. React-Redux and Node.js will be used on the front end to interact with users.  Photos will be hosted using AWS, and we will also utilize Google Maps API and React Day Picker API for calendars on the event page.

**Backend: MongoDB/Express** 

Data will be stored using MongoDB in a JSON-like structure. Relationships and schema validation between data will be implemented using Mongoose.  Express will be used to setup routes for  communication with frontend.  

Technical Challenges:

- Setting up models/schema/relationships for quests/events and reviews
- Setting up necessary routes via Express as needed
- CSRF validation and JWT login token validations
- Gathering and seeding adequate data for testing

Express Routing Example: 
```js
router.post('/', requireUser, validateEventInput, async (req, res, next) => {
    try {
        let attendeeIds = [];
        for (let i = 0; i < req.body.attendees.length; i++) {
            let user = await User.findOne({email: req.body.attendees[i]});
            attendeeIds.push(user._id)
        }
        const newEvent = new Event({
            quest: req.body.quest,
            host: req.user._id,
            attendees: attendeeIds,
            startTime: req.body.startTime
        })
        let event = await newEvent.save();
        event = await event.populate("host", "_id email firstName lastName profileImageUrl");
        event = await event.populate("attendees", "_id email firstName lastName");
        event = await event.populate("quest", "_id title description checkpoints duration formattedAddress lat lng radius tags creator imageUrls")
        return res.json(event);
    }
    catch(err) {
        next(err);
    }
})
```

**Frontend: React/Node.js** 

Quest data will be fetched from the backend for display for user to view and select.  Forms will be available to create/edit quests, events, users, and reviews.  

Technical Challenges: 

- Fetching and displaying data from MongoDB
- A filtering system of quests based on categories and/or tags
- Creating a checkpoint like system during expedition
- Presenting information of quests in a way to be descriptive for selection but not to reveal too much to spoil the fun

Filter on Home Page Example:
```js
<div className="dropdown-options dropdown-selected-open open-filter-dropdown"> 
    {allTags.map((tag, i)=><label className="dropdown-option dropdown-selected-open" key={i}>
    <input className="dropdown-option dropdown-selected-open" type="checkbox" checked={tags[tag]? tags[tag] : false} onChange={(e)=>{filterChange(e, tag)}}></input>
    <QuestShowTags tags={[tag]} ></QuestShowTags>
    </label>)}
</div>
```

Create/Update Quest Form Image File Handler Example:
```js
const handleFiles = ({ currentTarget }) => {
    const files = currentTarget.files; 
    setImages(files);
    if (files.length !==0) {
        let filesLoaded = 0; 
        const urls = [];
        Array.from(files).forEach((file, index) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                urls[index] = fileReader.result;
                if (++filesLoaded === files.length)
                setImageUrls(urls);
            }
        });
    }
    else setImageUrls([]);
}
```


**Library for Google Map - [https://www.npmjs.com/package/google-map-react](https://www.npmjs.com/package/google-map-react)**

Quests submitted by users will be saved in our backend and be rendered onto Google Map to show starting point of each quest.  Each quest data point will include latitude and longitude from the backend for use to populate the marker on the frontend.  

Google map implementation: 
```js
<GoogleMapReact
    bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
    defaultCenter={{lat: 40.74233116818592, lng: -73.99140855323562}}
    center={center}
    defaultZoom={defaultZoom}>
    {quests?.map((quest, i) => (
        <QuestMarker 
            key={i}
            lat={quest.lat}
            lng={quest.lng}
            quest={quest}
            decor={quests.length===1?"★":i+1}
        />
    ))}
</GoogleMapReact>
```

Technical Challenges: 

- Highlight the quest on the list when the corresponding marker is hover
- Highlight the marker when a quest is hover from a list
- Rendering the markers on the map with distinctive marker for different quest category

**Library for calendar - [https://react-day-picker.js.org/](https://react-day-picker.js.org/)** 

To start the hunt expedition (event) we will utilize a calendar API to allow the user to setup the event.  The event can then be shared with other challengers to allow them to join. 

Add guest function in create event form: 
```js
const addGuest = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (guest) {
        setInvalidUser(false);
        if (attendees[guest] || guest === host.email) {
            setInvalidUser(true)
            return;
        }
        if (Object.values(users).some((user) => user.email === guest)) {
            attendees[guest] = guest;
            setAttendees(attendees);
            setGuest("");
        }
        else {
            setInvalidUser(true);
        }
    }
}
```

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
- Build database on MongoDB for quests and events

**Tuesday**

- Connect Redux store to backend routes
- Build frontend functionality for quests feature
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

Quest Search functionality

Live checklist

Mobile friendly
