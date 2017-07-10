import React, { Component } from 'react';
import { is, Map } from 'immutable';
import PropTypes from 'prop-types';
import { ENTER_KEY } from '../store/constant'

class Todo extends Component {

  componentDidUpdate(prevProps, prevState) {
    let isPrevEditing = prevProps.editing === prevProps.id,
      isEditing = this.props.editing === this.props.id;
    if (!isPrevEditing && isEditing) {
      this.refs.editField.focus();
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.editing !== nextProps.id ? !is(this.props.todo, nextProps.todo) : true;
  }
  render() {
    return (
      <li
        className={[
          this.props.completed
            ? 'completed'
            : '',
          this.props.editing === this.props.id
            ? 'editing'
            : ''
        ].join(' ')}
      >
        <input
          type="checkbox"
          className="toggle"
          checked={this.props.completed}
          onChange={this.props.onToggle} />
        <label className="view" onDoubleClick={this.props.onEdit}>
          {this.props.text}
        </label>
        <input
          ref="editField"
          autoFocus={true}
          className="edit"
          type="text"
          defaultValue={this.props.text}
          onKeyDown={(e) => {
            let val = e.target.value;
            if (e.keyCode === ENTER_KEY) {
              this.props.text !== val ? this.props.onSave(val) : this.props.onEditDone();
            }
          }} />
        <button className="destroy" onClick={this.props.onRemove}>X</button>
      </li>
    );
  }
}
Todo.propTypes = {
  completed: PropTypes.bool,
  text: PropTypes.string,
  onToggle: PropTypes.func,
  onRemove: PropTypes.func,
  onEdit: PropTypes.func,
  onSave: PropTypes.func,
  onEditDone: PropTypes.func
};
export default Todo;
