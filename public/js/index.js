var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
    

});

socket.on('newMessage', function (recievedMessage) {
    console.log('new message', recievedMessage);
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});






