import React, { Component } from 'react';
import './NewTodo.css';

class NewTodo extends Component {

  constructor(props) {
    super(props);
    this.addTodo = this.addTodo.bind(this);
    // this.onChange = this.onChange.bind(this);
    this.state = {
      input: ''
    }
  }

  addTodo(event) {
    event.preventDefault();
    let newTodoItem = {
      text: event.target.input.value,
      completed: false
    };
    this.state = {
      input: ''
    }
    this.props.addTodo(newTodoItem);
  }

  render() {
    return (
      <aside className="newTodo">
        <form onSubmit = {this.addTodo} id="typeNewTodo">
          <input value = {this.props.input} onChange = {this.props.onChange} name = "input" id="newName" type="text" placeholder="Add new ToDo..."></input>
          <button id="submit">+</button>
        </form>
      </aside>
    );
  }
}

export default NewTodo;
