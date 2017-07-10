import React, { createClass } from 'react';
import { is } from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Todo from './Todo';

let TodoList = createClass({


  displayName: "TodoList",

  shouldComponentUpdate(nextProps, nextState) {
    return !is(this.props, nextProps);
  },

  render() {
    let { todos, editing, toggleTodo, removeTodo, editTodo, saveTodoAsync, editDone } = this.props;

    return (
      <ul className="todo-list">
        {todos.map(todo => {
          return (
            <Todo
              key={todo.id}
              {...todo}
              todo={todo}
              editing={editing}
              onToggle={() => toggleTodo(todo.id)}
              onRemove={() => removeTodo(todo.id)}
              onEdit={() => editTodo(todo.id)}
              onSave={(text) => saveTodoAsync(todo.id, text)}
              onEditDone={editDone}
            >
            </Todo>
          )
        })}
      </ul >
    );
  }
});

TodoList.propTypes = {
  editing: PropTypes.string,
  todos: ImmutablePropTypes.orderedSet,
  toggleTodo: PropTypes.func,
  removeTodo: PropTypes.func,
  editTodo: PropTypes.func,
  editDone: PropTypes.func
};

export default TodoList;

