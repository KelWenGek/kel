import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getVisibleTodos, makeGetVisibleTodos } from '../selectors/index';
import TodoList from '../components/TodoList';
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
const VisibleTodoList = connect(makeMapStateToProps, mapDispatchToProps)(TodoList);

export default VisibleTodoList;
