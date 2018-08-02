const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => { //when a connection is made between a server and client
    console.log('new user whoa');
    socket.emit('userLogin', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
    //socket.emit from admin text should say welcome to chat app
    //socket.broadcast.emit from admin text new user joined.

    socket.on('createMessage', (message, callback) => {
        console.log('message recieved', message);
        //when new message is recieved by server is sends it to all the users
        io.emit('newMessage', generateMessage(message.from, message.text)); //io.emit sends out to every client connected to the server
        callback('this is from the server');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('User', coords.latitude, coords.longitude));
    })

    socket.on('disconnect', () => {
        console.log('user was disconnected');
    });
});

server.listen(port, () => {
    console.log(`listening on port ${port}`);
});
