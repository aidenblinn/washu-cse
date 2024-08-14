var apiKey = "7167c5-bfb835-854571-ab06f9-e548e2";

// load existing ToDos
var existing = new XMLHttpRequest();
existing.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var todos = JSON.parse(this.responseText);
    for (var i = 0; i < todos.length; i++) {
      displayTodo(todos[i]);
    }
  }
  else if (this.readyState == 4) {
    console.log(this.responseText);
  }
};
existing.open("GET", "https://cse204.work/todos", true);
existing.setRequestHeader("x-api-key", apiKey);
existing.send();

// new ToDo submit
document.getElementById("typeNewTodo").addEventListener("submit", function(event) {
  event.preventDefault();
  // submit todo to api
  var data =  {
    text: newName.value
  }
  var createRequest = new XMLHttpRequest();
  createRequest.onreadystatechange = function() {
    // Wait for readyState = 4 & 200 response
    if (this.readyState == 4 && this.status == 200) {
      // parse JSON response
      displayTodo(JSON.parse(this.responseText));
    }
    else if (this.readyState == 4) {
      // this.status !== 200, error from server
      console.log(this.responseText);
    }
  }
  createRequest.open("POST", "https://cse204.work/todos", true);
  createRequest.setRequestHeader("Content-type", "application/json");
  createRequest.setRequestHeader("x-api-key", apiKey);
  createRequest.send(JSON.stringify(data));
});

// display new ToDo on page
function displayTodo(todoData) {
  // create new todo container
  var todo = document.createElement("article");
  // add id of todo as id of container
  todo.setAttribute("id", todoData.id);
  todo.classList.add("todoItem");
  if (todoData.completed) {
    todo.classList.add("completed");
  }
  // create complete button
  var check = document.createElement("button");
  check.classList.add("checkbox");
  todo.appendChild(check);
  // add text
  var text = document.createElement("p");
  text.innerText = todoData.text;
  todo.appendChild(text);
  // delete button
  var del = document.createElement("button");
  del.classList.add("delete");
  del.innerText = "-";
  todo.appendChild(del);
  // add todo to page
  document.getElementById("todo").appendChild(todo);
  // event listeners for button
  del.addEventListener("click", deleteTodo);
  check.addEventListener("click", completeTodo);
  // remove submitted todo text
  document.getElementById("newName").value = "";

}


// todo completion
function completeTodo(event) {
  // API call, PUT to completed
  var todoId = event.target.parentNode.id;
  var data = {
    completed: true
  }
  var completeRequest = new XMLHttpRequest();
  completeRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      event.target.parentNode.classList.add("completed");
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

// todo deletion
function deleteTodo(event) {
  var todoId = event.target.parentNode.id;
  // API call, DELETE
  var deleteRequest = new XMLHttpRequest();
  deleteRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      event.target.parentNode.remove();
    }
    else if (this.readyState == 4) {
      console.log(this.responseText);
    }
  }
  deleteRequest.open("DELETE", "https://cse204.work/todos/" + todoId, true);
  deleteRequest.setRequestHeader("Content-type", "application/json");
  deleteRequest.setRequestHeader("x-api-key", apiKey);
  deleteRequest.send();
  // remove from page
}
