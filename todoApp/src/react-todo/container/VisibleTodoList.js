import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getVisibleTodos, makeGetVisibleTodos } from '../selectors/index';
import TodoList from '../components/TodoList';
// { toggleTodo, removeTodo, editTodo, editDone, saveTodoAsync }
import * as mapDispatchToProps from '../store/action/index';

const makeMapStateToProps = () => {
  const getVisibleTodos = makeGetVisibleTodos();
  const mapStateToProps = (state, ownProps) => {
    // console.log(getVisibleTodos(state));
    return {
      todos: getVisibleTodos(state),
      editing: state.get('editing')
    };
  };
  return mapStateToProps;
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
const VisibleTodoList = connect(makeMapStateToProps, mapDispatchToProps)(TodoList);

export default VisibleTodoList;
