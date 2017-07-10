import React, { createClass } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../store/action/index.js';
import { ENTER_KEY } from '../store/constant';
let AddTodo = createClass({
  displayName: "AddTodo",
  doAddTodo(val) {
    let { dispatch } = this.props;
    dispatch(addTodo(val));
  },
  render() {
    let input;
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
      </div>
    );

  }

});

export default connect()(AddTodo);
