import jwtFetch from './jwt';

const RECEIVE_CURRENT_USER = "session/RECEIVE_CURRENT_USER";
const RECEIVE_ALL_USERS = "session/RECEIVE_ALL_USER"; //Not on MERN Twitter
const RECEIVE_USER = "session/RECEIVE_USER"; //Not on MERN Twitter
const RECEIVE_SESSION_ERRORS = "session/RECEIVE_SESSION_ERRORS";
const CLEAR_SESSION_ERRORS = "session/CLEAR_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "session/RECEIVE_USER_LOGOUT";


const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

const receiveAllUser = (users) => ({ //Not on Mern Twitter
    type: RECEIVE_ALL_USERS,
    users
});

const receiveUser = (user) => ({ //Not on Mern Twitter
    type: RECEIVE_USER,
    user
});
  
const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
});

export const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS
});

export const signup = user => startSession(user, '/api/users/register');
export const login = user => startSession(user, '/api/users/login');

const startSession = (userInfo, route) => async dispatch => {
  try {  
    const res = await jwtFetch(route, {
      method: "POST",
      body: JSON.stringify(userInfo)
    });
    const { user, token } = await res.json();
    localStorage.setItem('jwtToken', token);
    dispatch(receiveCurrentUser(user));
    return user
  } catch(err) {
    const res = await err.json();
    if (res.statusCode === 400) {
      dispatch(receiveErrors(res.errors));
    }
  }
};

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken');
    dispatch(logoutUser());
};

export const getCurrentUser = () => async dispatch => {
    const res = await jwtFetch('/api/users/current');
    const user = await res.json();
    return dispatch(receiveCurrentUser(user));
};

//getAllUser not on MERN Twitter
export const getAllUser = () => async dispatch => {
    const res = await jwtFetch('/api/users');
    const users = await res.json();
    return dispatch(receiveAllUser(users));
};

//getUser not on MERN Twitter
export const getUser = (userId) => async dispatch => {
    const res = await jwtFetch(`/api/users/${userId}`);
    const user = await res.json();
    return dispatch(receiveUser(user));
};

const initialState = {
    user: undefined
};
  
const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
      case RECEIVE_CURRENT_USER:
        return { user: action.currentUser };
      case RECEIVE_USER_LOGOUT:
        return initialState;
      default:
        return state;
    }
};

const nullErrors = null;

export const sessionErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
    case CLEAR_SESSION_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};
  
export default sessionReducer;