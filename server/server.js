const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => { //when a connection is made between a server and client
    console.log('new user whoa');
    socket.emit('userLogin', {
        from:'admin',
        text:'welcome to the chat app',
        createdAt: new Date().getTime()
    });
    socket.broadcast.emit('userLogin', { //broadcast sends to everyone except the client that made the connection
        from:'admin',
        text: 'a new challenger has appeared',
        createdAt: new Date().getTime()
    });
    //socket.emit from admin text should say welcome to chat app
    //socket.broadcast.emit from admin text new user joined.

    socket.on('createMessage', (message) => {
        message.createdAt = 123;
        console.log('message sent', message);
        io.emit('newMessage', {
            from:message.from,
            text:message.text,
            createdAt: new Date().getTime()
        });
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    

    socket.on('disconnect', () => {
        console.log('user was disconnected');
    });
});

server.listen(port, () => {
    console.log(`listening on port ${port}`);
});
