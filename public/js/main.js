var socket = io();
var form = document.querySelector('form');

form.addEventListener('submit', e => {
    e.preventDefault();
    socket.emit('chat message', document.getElementById('m').value);
    document.getElementById('m').value = '';
    document.getElementById('m').focus();
})

socket.on('chat message', function(msg) {
    var item = document.createElement('div');
    item.classList.add('message');
    item.innerHTML = `<p class="meta">${msg.username}</p><p class="text">${msg.text}</p>`;
    document.querySelector('.messages').appendChild(item);
    document.querySelector('.messages').scrollTop = document.querySelector('.messages').scrollHeight;
})

var name = prompt('What is your name?');
socket.emit('new user', name);

// Clear messages
var clearButton = document.querySelector('#clearButton');
var messages = document.querySelector('.messages');

clearButton.addEventListener('click', () => {
    messages.innerHTML = "";
})