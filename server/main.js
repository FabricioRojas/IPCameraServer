var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var messages = [];

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.status(200).send("Server running");
});

io.on('connection', function(socket) {
  console.log('Alguien se ha conectado con Sockets');
  socket.emit('messages', messages);

  socket.on('new-message', function(data) {
    messages.push(data);

    io.sockets.emit('messages', messages);
  });
});


io.on('newFrame', function(socket) {
	console.log('New frame received');
});

server.listen(8080, function() {
  console.log("Servidor corriendo en http://localhost:8080");
});