import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';

var apiKey = "7167c5-bfb835-854571-ab06f9-e548e2";

class App extends Component {

  constructor() {
    super();
    this.state = {
      todos: [],
      input: ''
    }
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.completeTodo = this.completeTodo.bind(this);
    this.sortTodo = this.sortTodo.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  addTodo(event) {
    var self = this;
    var newTodo = {
      text: event.text
    };
    var createRequest = new XMLHttpRequest();
    createRequest.onreadystatechange = function() {
      // Wait for readyState = 4 & 200 response
      if (this.readyState == 4 && this.status == 200) {
        // parse JSON response
        self.setState({
          todos: [...self.state.todos, JSON.parse(this.responseText)]
        })
        self.setState({input: ''})
      }
      else if (this.readyState == 4) {
        // this.status !== 200, error from server
        console.log(this.responseText);
      }
    }
    createRequest.open("POST", "https://cse204.work/todos", true);
    createRequest.setRequestHeader("Content-type", "application/json");
    createRequest.setRequestHeader("x-api-key", apiKey);
    createRequest.send(JSON.stringify(newTodo));
  }

  completeTodo(event) {
    var self = this;
    var button = event.target;
    var todoId = event.target.parentNode.id;
    event.target.parentNode.className = "completed todoItem";
    var data = {
      completed: true
    }
    const updatedTodos = self.state.todos.map((todo) =>{
      if (todo.id == todoId) {
        todo.completed = true;
      }
      return todo;
    })
    self.setState({todos: updatedTodos});
    var completeRequest = new XMLHttpRequest();
    completeRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
      }
      else if (this.readyState == 4) {
        console.log(this.responseText);
      }
    }
    completeRequest.open("PUT", "https://cse204.work/todos/" + todoId, true);
    completeRequest.setRequestHeader("Content-type", "application/json");
    completeRequest.setRequestHeader("x-api-key", apiKey);
    completeRequest.send(JSON.stringify(data));
  }

  deleteTodo(event) {
    var self =  this;
    var todoId = event.target.parentNode.id;
    // API call, DELETE
    var deleteRequest = new XMLHttpRequest();
    deleteRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
      }
      else if (this.readyState == 4) {
        console.log(this.responseText);
      }
    }
    deleteRequest.open("DELETE", "https://cse204.work/todos/" + todoId, true);
    deleteRequest.setRequestHeader("Content-type", "application/json");
    deleteRequest.setRequestHeader("x-api-key", apiKey);
    deleteRequest.send();
    const updatedTodos = self.state.todos.filter((todo) =>{
      if (todo.id !== todoId) {
        return todo;
      }
    })
    self.setState({todos: updatedTodos});
  }

  sortTodo() {
    var self = this;
    const sortedList = self.state.todos;
    sortedList.sort(function(a,b) {
      return a.text.localeCompare(b.text);
    })
    this.setState({todos: sortedList});
  }

  render() {
    return (
      <div className="App">
      <button id = "sortbutton" onClick = {this.sortTodo}>Sort</button>
      <section id = "todo">
      <NewTodo  newTodo = {this.newTodo} onChange = {this.onChange}
      input = {this.state.input} addTodo = {this.addTodo}></NewTodo>
      {this.state.todos.map((todo) =>
        <Todo key={todo.id} id={todo.id} completed={todo.completed}
        text={todo.text} completeTodo = {this.completeTodo} deleteTodo={this.deleteTodo}/>)}
        </section>
        </div>
      );
    }

    componentDidMount() {
      var self = this;
      var list = new XMLHttpRequest();
      list.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var todos = JSON.parse(this.responseText);
          self.setState({todos: todos})
        }
        else if (this.readyState == 4) {
          console.log(self.responseText);
        }
      }
      list.open("GET", "https://cse204.work/todos", true);
      list.setRequestHeader("x-api-key", apiKey);
      list.send();
    }

  }

  export default App;
