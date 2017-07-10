import React, { Component } from 'react';
import AddTodo from './components/AddTodo';
import VisibleTodoList from './container/VisibleTodoList';
import Footer from './container/Footer';
class App extends Component {
  render() {
    return (
      <div>
        <div className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <AddTodo />
          </header>
          <VisibleTodoList />
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
