import * as api_action from './action_type';
export const VISIBILITY_FILTER = {
  ALL: 'SHOW_ALL',
  COMPLETED: 'SHOW_COMPLETED',
  ACTIVE: 'SHOW_ACTIVE'
};
export const ENTER_KEY = 13;

const api_prefix = 'http://localhost:3000/todos'
export const API = {
  [api_action.ADD_TODO]: `${api_prefix}/add`,
  [api_action.TOGGLE_TODO]: `${api_prefix}/toggle`,
  [api_action.TOGGLE_ALL_TODO]: `${api_prefix}/toggleall`,
  [api_action.REMOVE_TODO]: `${api_prefix}/del`,
  [api_action.INIT_TODO]: `${api_prefix}/list`
}