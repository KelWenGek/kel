import React, { createClass, Component } from 'react';
import { is } from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Todo from './Todo';

class TodoList extends Component {
  static propTypes = {
    editing: PropTypes.string,
    todos: ImmutablePropTypes.orderedMap,
    toggleTodo: PropTypes.func,
    removeTodo: PropTypes.func,
    editTodo: PropTypes.func,
    editDone: PropTypes.func
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !is(this.props, nextProps);
  }

  render() {
    let { todos, editing, toggleTodo, toggleTodoAsync, removeTodoAsync, removeTodo, editTodo, saveTodoAsync, editDone } = this.props;
    return (
      <ul className="todo-list">
        {todos.toArray().map(todo => {
          return (
            <Todo
              key={todo.pid}
              {...todo}
              todo={todo}
              editing={editing}
              onToggle={() => toggleTodoAsync(todo.pid)}
              onRemove={() => removeTodoAsync(todo.pid)}
              onEdit={() => editTodo(todo.pid)}
              onSave={(text) => saveTodoAsync(todo.pid, text)}
              onEditDone={editDone}
            >
            </Todo>
          )
        })}
      </ul >
    );
  }
};



export default TodoList;

