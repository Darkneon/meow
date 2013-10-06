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