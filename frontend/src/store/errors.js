import { combineReducers } from 'redux';
import { sessionErrorsReducer } from './session';
import { questErrorsReducer } from './quests';

export default combineReducers({
  session: sessionErrorsReducer,
  quests: questErrorsReducer
});