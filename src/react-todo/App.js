import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getInitList } from './store/action/index';
import PropTypes from 'prop-types';
import AddTodo from './components/AddTodo';
import VisibleTodoList from './container/VisibleTodoList';
import Footer from './container/Footer';
@connect(null, { getInitList })
class App extends Component {

  static contextTypes = {
    store: PropTypes.shape({
      subscribe: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired
    })
  }
  componentDidMount() {
    let { getInitList } = this.props;
    getInitList();
  }

  render() {
    return (
      <div>
        <div className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <AddTodo />
          </header>
          <VisibleTodoList listId="1" />
          <Footer />
        </div>
        <div className="info">
          <p>Double-click to edit a todo</p>
          <p>Created by <a href="#">Kel</a></p>
        </div>
      </div>
    );
  }
}

export default App;
