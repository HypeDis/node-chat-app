var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
    
});

socket.on('userLogin', function (message) {
    console.log('message from admin', message);
});

socket.on('newMessage', function (recievedMessage) {
    console.log('new message', recievedMessage);
    var li = jQuery('<li></li>');
    li.text(`${recievedMessage.from}: ${recievedMessage.text}`);

    jQuery('#messages').append(li);
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.emit('createMessage', {
    from:'Frank',
    text:'hi'
}, function(data){
    console.log('Got it', data);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function(){

    });
});

