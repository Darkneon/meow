// server setup

var express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server);

// static content

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));

// port

var port = process.env.PORT || 3000;
server.listen(port);

// routes

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/ws-client.html')
});

// configuration

io.configure(function() { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

// events

// users = []

// io.sockets.on('connection', function(socket) {
//   socket.on('sign in', function(data, callback) {
//     users.push(data);
//     socket.user = data;
//     callback({status: 0, users: users});
//     socket.broadcast.emit('sign in', data);
//   });

//   socket.on('new message', function(data) {
//     io.sockets.emit('new message', {user: socket.user, message: data});
//   });

//   socket.on('disconnect', function () {
//     io.sockets.emit('sign out', socket.user);
//     users.splice(users.indexOf(socket.user), 1);
//   });
// });