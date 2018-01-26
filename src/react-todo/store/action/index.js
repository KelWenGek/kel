import {
  INIT_TODO,
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
import { util } from '../util';
import axios from 'axios';
import { API } from '../constant';
export const initTodoList = (list) => ({ type: INIT_TODO, list });
export const addTodo = ({ pid, text }) => ({ type: ADD_TODO, pid, text });
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
//异步添加todo
export const addTodoAsync = (text) => dispatch => {
  let pid = util.uuid();
  axios.post(API[ADD_TODO], {
    pid,
    text,
    completed: false
  }).then(res => {
    dispatch(addTodo({ pid, text }))
  });
};

//异步改变todo
export const toggleTodoAsync = id => dispatch => {
  axios.post(API[TOGGLE_TODO], {
    id
  }).then(res => {
    if (res.data.code === 200) {
      dispatch(toggleTodo(id));
    }
  });
};

//异步移除todo
export const removeTodoAsync = id => dispatch => {
  axios.post(API[REMOVE_TODO], {
    id
  }).then(res => {
    console.log(res);
    if (res.data.code === 200) {
      dispatch(removeTodo(id));
    }
  })
};

//异步获取todo列表
export const getInitList = () => dispatch => {
  axios.get(API[INIT_TODO]).then(res => {
    dispatch(initTodoList(res.data));
  });
};

//异步改变全部todo
export const toggleAllTodoAsync = (checked) => dispatch => {
  axios.post(API[TOGGLE_ALL_TODO], {
    checked
  }).then(res => {
    if (res.data.code === 200) {
      dispatch(toggleAllTodo(checked));
    }
  })
};