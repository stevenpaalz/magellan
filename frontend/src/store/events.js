import jwtFetch from "./jwt";

export const RECEIVE_ALL_EVENTS = "events/RECEIVE_ALL_EVENTS";
export const RECEIVE_EVENT = "events/RECEIVE_EVENT";
export const REMOVE_EVENT = "events/REMOVE_EVENT";

const receiveAllEvents = (events) => ({
    type: RECEIVE_ALL_EVENTS,
    events
}); 

const receiveEvent = (event) => ({
    type: RECEIVE_EVENT,
    event
});

const removeEvent = (eventId) => ({
    type: REMOVE_EVENT, 
    eventId
});

export const getAllEvents = () => async dispatch => {
    const res = await jwtFetch('/api/events');
    const data = await res.json();
    const events = {};
    data.forEach((el)=>{
        events[el._id] = el
    });
    return dispatch(receiveAllEvents(events));
}

export const getEvent = (eventId) => async dispatch => {
    const res = await jwtFetch(`/api/events/${eventId}`);
    const event = await res.json();
    return dispatch(receiveEvent(event));
}

export const deleteEvent = (eventId) => async dispatch => {
    const res = await jwtFetch(`/api/events/${eventId}`, {
        method: 'DELETE'
    });
    dispatch(removeEvent(eventId));
}

export const createEvent = (event) => async dispatch => {
    const res = await jwtFetch('/api/events', {
        method: 'POST',
        body: JSON.stringify(event)
    });
    const data = await res.json();
    return dispatch(receiveEvent(data.event));
}

function eventsReducer(state = {}, action) {
    let newState = {...state};
    switch (action.type) {
        case RECEIVE_ALL_EVENTS:
            return { ...action.events };
        case RECEIVE_EVENT:
            newState[action.event._id] = action.event;
            return newState;
        case REMOVE_EVENT:
            delete newState[action.eventId];
        default:
            return state;
    }
}

export default eventsReducer;