// Note: for help understanding how to use the join/leave functions, I consulted https://dev.to/chewypao/private-chat-using-socket-io-39o5
// for help understanding how broadcast messages to select groups / individual people, I used this thread: https://stackoverflow.com/questions/6873607/socket-io-rooms-difference-between-broadcast-to-and-sockets-in

// Require the packages we will use:
const http = require("http"),
    fs = require("fs");

const port = 3456;
const file = "client.html";
// Listen for HTTP connections.  This is essentially a miniature static file server that only serves our one file, client.html, on port 3456:
const server = http.createServer(function (req, res) {
    // This callback runs when a new connection is made to our HTTP server.

    fs.readFile(file, function (err, data) {
        // This callback runs when the client.html file has been read from the filesystem.

        if (err) return res.writeHead(500);
        res.writeHead(200);
        res.end(data);
    });
});
server.listen(port);

// Import Socket.IO and pass our HTTP server object to it.
const socketio = require("socket.io")(http, {
    wsEngine: 'ws'
});

var users = {};
var rooms = [];
rooms.push({name:"welcome",password:''});
// document.getElementById("chatlog").appendChild(document.createElement("hr"));

// Attach our Socket.IO server to our HTTP server to listen
const io = socketio.listen(server);
io.sockets.on('connection', function (socket) {
    // This callback runs when a new Socket.IO connection is established.

    const ID = socket.id;

    socket.on('login', function(data) {
      if (users.hasOwnProperty(data.username)) {
        socket.emit("retry");
        return;
      }
			socket.username  = data.username;
			socket.room = 'welcome';
      users[data.username] = data.username;
      socket.join('default');
		});

    socket.on('roomlist', function() {
      socket.emit('roomlistreturn', rooms);
    });

    socket.on('disconnect', function() {
      var disconnect = socket.username + " has disconnected"
      delete users[socket.username];
      socket.broadcast.to(socket.room).emit(disconnect);
    });

    socket.on('message_to_server', function (data) {
      // This callback runs when the server receives a new message from the client.

      console.log("message: " + data["message"]); // log it to the Node.JS output
      io.sockets.in(socket.room).emit("message_to_client", { username:socket.username, message: data["message"] }) // broadcast the message to other users
    });

    socket.on('newroom', function(data) {
      if (data.name == '') {
        socket.emit("roomerror");
        return;
      }
      for (i = 0; i < rooms.length; i++) {
        if (rooms[i].name == data.name) {
          socket.emit("roomerror");
          return;
        }
      }
      if (data.password != '') {
        rooms.push({name:data.name,password:data.password});
        io.sockets.emit("addroom",{name:data.name});
        return;
      }
      rooms.push({name:data.name,password:''});
      io.sockets.emit("addroom",{name:data.name});
    });

    socket.on("changeroom", function(data) {
      for (i = 0; i < rooms.length; i++) {
        if (rooms[i].name == data) {
          if (rooms[i].password != '') {
            socket.emit("enterpassword", data)
          }
        }
      }
      socket.leave(socket.room);
      var leave = socket.username + " has left the chat";
      socket.broadcast.to(socket.room).emit(leave);
      socket.join(data);
      socket.room = data;
      var enter = socket.username + " has entered the chat";
      io.sockets.in(socket.room).emit("update", enter);
      socket.emit("loadroom");
    });

    socket.on("checkpassword", function(data) {
      for (i = 0; i < rooms.length; i++) {
        if (rooms[i].name == data.room) {
          if (rooms[i].password == data.password) {
            socket.leave(socket.room);
            var leave = socket.username + " has left the chat";
            socket.broadcast.to(socket.room).emit(leave);
            socket.join(data);
            socket.room = data;
            var enter = socket.username + " has entered the chat";
            io.sockets.in(socket.room).emit("update", enter);
            socket.emit("loadroom");
            return;
          }
          else {
            socket.emit("failed");
          }
        }
      }
    })
});
