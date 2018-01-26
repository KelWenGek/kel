import { combineReducers } from 'redux-immutable';
import todos from './todos';
import visibilityFilter from './visibilityFilter';
import editing from './editing';
let todoApp = combineReducers({
  todos,
  visibilityFilter,
  editing
});
export default todoApp;
