import * as ACTION_TYPE from '../action_type';
import {VISIBILITY_FILTER} from '../constant';
const visibilityFilter = (state = VISIBILITY_FILTER.ALL, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_VISIBILITY_FILTER:
      return action.visibilityFilter;
    default:
      return state;
  }
};

export default visibilityFilter;
