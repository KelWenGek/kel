import { createSelector } from 'reselect';
import { VISIBILITY_FILTER } from '../store/constant';



export const makeGetVisibleTodos = () => createSelector([state => state.get('todos'), state => state.get('visibilityFilter')], (todos, filter) => {
    switch (filter) {
        case VISIBILITY_FILTER.ALL:
            return todos;
        case VISIBILITY_FILTER.COMPLETED:
            return todos.filter((todo) => todo.completed);
        case VISIBILITY_FILTER.ACTIVE:
            return todos.filter((todo) => !todo.completed);
    }
});

export const getVisibleTodos = createSelector([state => state.get('todos'), state => state.get('visibilityFilter')], (todos, filter) => {
    switch (filter) {
        case VISIBILITY_FILTER.ALL:
            return todos;
        case VISIBILITY_FILTER.COMPLETED:
            return todos.filter((todo) => todo.completed);
        case VISIBILITY_FILTER.ACTIVE:
            return todos.filter((todo) => !todo.completed);
    }
});