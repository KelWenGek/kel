import React, { createClass, Component } from 'react';
import { is } from 'immutable';
import { connect } from 'react-redux';
import { addTodo, addTodoAsync, toggleAllTodo, toggleAllTodoAsync } from '../store/action/index.js';
import { ENTER_KEY } from '../store/constant';
export default connect((state) => {
  let todos = state.get('todos');
  return {
    isToggleAll: todos.size !== 0 && todos.filter(todo => !todo.completed).size === 0
  };
}, { addTodo, addTodoAsync, toggleAllTodoAsync, toggleAllTodo })(class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleAll: false
    };
  }
  doAddTodo = (val) => {
    let { addTodoAsync } = this.props;
    addTodoAsync(val);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !is(this.props, nextProps);
  }

  render() {
    let input;
    let { isToggleAll, toggleAllTodo, toggleAllTodoAsync } = this.props;
    return (
      <div>
        <input
          className="new-todo"
          placeholder="What todo to add"
          type="text"
          ref={node => {
            input = node;
          }}
          onKeyDown={e => {
            if (e.keyCode === ENTER_KEY) {
              let val = e.target.value;
              if (!val.trim()) {
                return;
              }
              this.doAddTodo(val);
              input.value = '';
            }
          }} />
        <span className={['toggle-all', isToggleAll ? 'checked' : ''].join(' ')}
          onClick={(e) => {
            this.setState((prevState, props) => {
              let nextChecked = !prevState.isToggleAll;
              toggleAllTodoAsync(nextChecked);
              return {
                isToggleAll: nextChecked
              }
            })
          }} ></span>
      </div>
    );
  }
});
