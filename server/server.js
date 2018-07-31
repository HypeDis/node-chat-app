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

io.on('connection', (socket) => {
    console.log('new user whoa');

    

    socket.on('createMessage', (message) => {
        message.createdAt = 123;
        console.log('message sent', message);
        io.emit('newMessage', {
            from:message.from,
            text:message.text,
            createdAt: new Date().getTime()
        });
    });

    

    socket.on('disconnect', () => {
        console.log('user was disconnected');
    });
});

server.listen(port, () => {
    console.log(`listening on port ${port}`);
});
