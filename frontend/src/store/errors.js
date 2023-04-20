import { combineReducers } from 'redux';
import { eventErrorsReducer } from './events';
import { reviewErrorsReducer } from './reviews';
import { sessionErrorsReducer } from './session';
import { userErrorsReducer } from './users';
import { questErrorsReducer } from './quests';

export default combineReducers({
  session: sessionErrorsReducer,
  event: eventErrorsReducer,
  user: userErrorsReducer,
  review: reviewErrorsReducer,
  quest: questErrorsReducer
});