import * as ACTION_TYPE from '../action_type';

const editing = (state = '', action) => {
  switch (action.type) {
    case ACTION_TYPE.EDIT_TODO:
      return action.id;
    case ACTION_TYPE.EDIT_DONE:
      return '';
    case ACTION_TYPE.SAVE_TODO:
      return '';
    default:
      return state;
  }
};

export default editing;
