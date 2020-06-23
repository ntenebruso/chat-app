var path = require('path');
var http = require('http');
var express = require('express');
var socketio = require('socket.io');
var app = express();
var server = http.createServer(app);
var io = socketio(server);
var {
    userJoin,
    getCurrentUser,
    userLeave
} = require('./utils/users');
var formatMessage = require('./utils/messages');

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket) {
    socket.on('new user', name => {
        const user = userJoin(socket.id, name);
        socket.broadcast.emit('chat message', formatMessage('Chatt Bot', `${user.username} has joined the chat`));
    })

    socket.emit('chat message', formatMessage('Chatt Bot', 'Welcome to Chatt! Type something to begin'));

    socket.on('chat message', msg => {
        const user = getCurrentUser(socket.id);
        io.emit('chat message', formatMessage(user.username, msg));
    })

    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if (user) {
            io.emit('chat message', formatMessage('Chatt Bot', `${user.username} has left the chat`));
        }
    })
})

server.listen(3000, () => {
    console.log("Server running on port 3000");
})