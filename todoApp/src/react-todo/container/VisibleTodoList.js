import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import TodoList from '../components/TodoList';
// { toggleTodo, removeTodo, editTodo, editDone, saveTodoAsync }
import * as mapDispatchToProps from '../store/action/index';
import { VISIBILITY_FILTER } from '../store/constant';

const getVisibleTodos = createSelector([state => state.get('todos'), state => state.get('visibilityFilter')], (todos, filter) => {
  switch (filter) {
    case VISIBILITY_FILTER.ALL:
      return todos;
    case VISIBILITY_FILTER.COMPLETED:
      return todos.filter((todo) => todo.completed);
    case VISIBILITY_FILTER.ACTIVE:
      return todos.filter((todo) => !todo.completed);
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    todos: getVisibleTodos(state),
    editing: state.get('editing')
  };
};
//可以是一个返回actions的函数
// const mapDispatchToProps = (dispatch) => bindActionCreators({
//   onTodoToggle: toggleTodo,
//   onTodoRemove: removeTodo,
//   onTodoEdit: editTodo,
//   onEditDone: editDone,
//   onTodoSave: saveTodoAsync
// }, dispatch);


//可以是一个actions的对象
// const mapDispatchToProps = {
//   toggleTodo,
//   removeTodo,
//   editTodo,
//   editDone,
//   saveTodoAsync
// };

// const VisibleTodoList = connect(mapStateToProps,mapDispatchToProps)(TodoList);
const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default VisibleTodoList;
