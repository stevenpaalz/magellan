import { combineReducers } from 'redux';
import { eventErrorsReducer } from './events';
import { sessionErrorsReducer } from './session';
import { questErrorsReducer } from './quests';

export default combineReducers({
  session: sessionErrorsReducer,
  quests: questErrorsReducer,
  event: eventErrorsReducer
});