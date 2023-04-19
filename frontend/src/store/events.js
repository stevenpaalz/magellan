import jwtFetch from "./jwt";

export const RECEIVE_ALL_EVENTS = "events/RECEIVE_ALL_EVENTS";
export const RECEIVE_EVENT = "events/RECEIVE_EVENT";
export const REMOVE_EVENT = "events/REMOVE_EVENT";
const RECEIVE_EVENT_ERRORS = "events/RECEIVE_EVENT_ERRORS";
const CLEAR_EVENT_ERRORS = "events/CLEAR_EVENT_ERRORS";

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

const receiveErrors = errors => ({
    type: RECEIVE_EVENT_ERRORS,
    errors
});

export const clearEventErrors = errors => ({
    type: CLEAR_EVENT_ERRORS,
    errors
});

export const getAllEvents = () => async dispatch => {
    try {
        const res = await jwtFetch('/api/events');
        const data = await res.json();
        const events = {};
        data.forEach((el)=>{
            events[el._id] = el
        });
        return dispatch(receiveAllEvents(events));
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
}

export const getEvent = (eventId) => async dispatch => {
    try{
        const res = await jwtFetch(`/api/events/${eventId}`);
        const event = await res.json();
        return dispatch(receiveEvent(event));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
          return dispatch(receiveErrors(resBody.errors));
        }
    }
}

export const deleteEvent = (eventId) => async dispatch => {
    const res = await jwtFetch(`/api/events/${eventId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        dispatch(removeEvent(eventId));
    }
}

export const createEvent = (event) => async dispatch => {
    try{
        const res = await jwtFetch('/api/events', {
            method: 'POST',
            body: JSON.stringify(event)
        });
        const data = await res.json();
        dispatch(receiveEvent(data));
        return data._id
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
          return dispatch(receiveErrors(resBody.errors));
        }
    }
}

function eventsReducer(state = {}, action) {
    let newState = {...state};
    switch(action.type) {
        case RECEIVE_ALL_EVENTS:
            return { ...action.events };
        case RECEIVE_EVENT:
            newState[action.event._id] = action.event;
            return newState;
        case REMOVE_EVENT:
            delete newState[action.eventId];
            return newState;
        default:
            return state;
    }
}

const nullErrors = null;

export const eventErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_EVENT_ERRORS:
      return action.errors;
    case RECEIVE_EVENT:
    case CLEAR_EVENT_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

export default eventsReducer;