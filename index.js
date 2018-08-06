var express = require('express');
var socket = require('socket.io');

// Set up the application
var app = express();
var server = app.listen(4400, function () {
  console.log('Listening to requests on port 4400');
});

app.use(express.static('public'));

var io = socket(server);
io.on('connection', function (socket) {
  console.log('Made socket connection', socket.id);

  socket.on('chat', function (data) {
    io.sockets.emit('chat', data);
  });

  socket.on('typing', function (data) {
    socket.broadcast.emit('typing', data);
  });
});