var express = require('express');
var fs = require("fs");

var app = express();
// var server = require('http').Server(app);
var io = require('socket.io')(server);
const dgram = require('dgram');
var server = dgram.createSocket('udp4');

var messages = [];

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.status(200).send("Server running");
});

// io.on('connection', function(socket) {
//   console.log('Alguien se ha conectado con Sockets');
//   socket.emit('messages', messages);

//   socket.on('new-message', function(data) {
//     messages.push(data);

//     io.sockets.emit('messages', messages);
//   });
// });


// io.on('newFrame', function(socket) {
// 	console.log('New frame received');
// });
server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  //console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  fs.writeFile("out.png", msg, 'base64', function(err) {
    if(err) console.log("Error", err);
    console.log("r", new Date());
  });
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(41234);

// server.listen(8080, function() {
//   console.log("Servidor corriendo en http://localhost:8080");
// });