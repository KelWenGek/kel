import {
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  SET_VISIBILITY_FILTER,
  EDIT_TODO,
  EDIT_DONE,
  SAVE_TODO,
  TOGGLE_ALL_TODO,
  CLEAR_COMPLETED
} from '../action_type.js';

export const addTodo = (text) => ({ type: ADD_TODO, text });
export const toggleTodo = (id) => ({ type: TOGGLE_TODO, id });
export const removeTodo = (id) => ({ type: REMOVE_TODO, id });
export const setVisibilityFilter = (visibilityFilter) => ({ type: SET_VISIBILITY_FILTER, visibilityFilter });
export const editTodo = (id) => ({ type: EDIT_TODO, id });
export const editDone = (payload) => ({ type: EDIT_DONE, payload });
export const saveTodo = (id, text) => ({ type: SAVE_TODO, id, text });
export const toggleAllTodo = (checked) => ({
  type: TOGGLE_ALL_TODO,
  checked
});
export const clearCompleted = (payload) => ({
  type: CLEAR_COMPLETED,
  payload
});

//异步action
export const saveTodoAsync = (id, text) => dispatch => {
  dispatch(saveTodo(id, text));
  console.log('发起请求');
  setTimeout(() => {
    console.log('请求结束');
  }, 2000);
};
