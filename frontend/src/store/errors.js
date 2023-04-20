import { combineReducers } from 'redux';
import { eventErrorsReducer } from './events';
import { reviewErrorsReducer } from './reviews';
import { sessionErrorsReducer } from './session';
import { userErrorsReducer } from './users';

export default combineReducers({
  session: sessionErrorsReducer,
  event: eventErrorsReducer,
  user: userErrorsReducer,
  review: reviewErrorsReducer
});