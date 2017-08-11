import * as ACTION_TYPE from '../action_type';
import { Model } from '../util';
let model = new Model('todoapp');
const todos = (state = model.todos, action) => {
  switch (action.type) {
    case ACTION_TYPE.INIT_TODO:
      return model.init(action);
    case ACTION_TYPE.ADD_TODO:
      return model.add(action);
    case ACTION_TYPE.TOGGLE_TODO:
      return model.toggle(action);
    case ACTION_TYPE.REMOVE_TODO:
      return model.remove(action);
    case ACTION_TYPE.SAVE_TODO:
      return model.save(action);
    case ACTION_TYPE.TOGGLE_ALL_TODO:
      return model.toggleAll(action);
    case ACTION_TYPE.CLEAR_COMPLETED:
      return model.clearCompleted();
    default:
      return state;
  }
};
export default todos;
