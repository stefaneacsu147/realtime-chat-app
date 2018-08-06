// Create connection
var socket = io.connect('http://localhost:4400');

// DOM Queries
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var button = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

// Create events

button.addEventListener('click', function () {
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
});

message.addEventListener('keypress', function () {
  socket.emit('typing', handle.value);
});

// Listen for events
socket.on('chat', function (data) {
  feedback.innerHTML = "";
  output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function (data) {
  feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});