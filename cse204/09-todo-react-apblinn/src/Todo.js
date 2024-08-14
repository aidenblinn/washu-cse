import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      completed: this.props.completed
    };
  }

  crossOut = () => {
    if (this.props.completed) {
      return {
        textDecoration: 'line-through'
      }
    }
    return
  }

  // completeTodo(event) {
  //   event.preventDefault();
  //   this.props.completeTodo(this.props.id);
  // }

  render() {
    return (
        <article id={this.props.id} className="todoItem" className={this.state.completed ? "completed todoItem" : "notCompleted todoItem"} style = {this.crossOut()}>
          <button className="checkbox" onClick = {this.props.completeTodo}></button>
          <p>{this.props.text}</p>
          <button className="delete" onClick = {this.props.deleteTodo} >-</button>
        </article>
    );
  }


}

export default Todo;
