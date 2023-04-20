import jwtFetch from "./jwt";

export const RECEIVE_ALL_USERS = "users/RECEIVE_ALL_USERS";
export const RECEIVE_USER = "users/RECEIVE_USER";
export const REMOVE_USER = "users/REMOVE_USER";
const RECEIVE_USER_ERRORS = "users/RECEIVE_USER_ERRORS";
const CLEAR_USER_ERRORS = "users/CLEAR_USER_ERRORS";

const receiveAllUsers = (users) => ({
    type: RECEIVE_ALL_USERS,
    users
}); 

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
});

const removeUser = (userId) => ({
    type: REMOVE_USER, 
    userId
});

const receiveErrors = errors => ({
    type: RECEIVE_USER_ERRORS,
    errors
});

export const clearUserErrors = errors => ({
    type: CLEAR_USER_ERRORS,
    errors
});

export const getAllUsers = () => async dispatch => {
    try {
        const res = await jwtFetch('/api/users');
        const data = await res.json();
        return dispatch(receiveAllUsers(data.users));
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
}

export const getUser = (userId) => async dispatch => {
    try{
        const res = await jwtFetch(`/api/users/${userId}`);
        const user = await res.json();
        return dispatch(receiveUser(user));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
          return dispatch(receiveErrors(resBody.errors));
        }
    }
}

export const deleteUser = (userId) => async dispatch => {
    const res = await jwtFetch(`/api/users/${userId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        dispatch(removeUser(userId));
    }
}

function usersReducer(state = {}, action) {
    let newState = {...state};
    switch(action.type) {
        case RECEIVE_ALL_USERS:
            return { ...action.users };
        case RECEIVE_USER:
            newState[action.user._id] = action.user;
            return newState;
        case REMOVE_USER:
            delete newState[action.userId];
            return newState;
        default:
            return state;
    }
}

const nullErrors = null;

export const userErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_USER_ERRORS:
      return action.errors;
    case RECEIVE_USER:
    case CLEAR_USER_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

export default usersReducer;