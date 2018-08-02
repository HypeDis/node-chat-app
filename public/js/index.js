var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

});

socket.on('userLogin', function (message) {
    console.log('message from admin', message);
});

socket.on('newMessage', function (recievedMessage) {
    console.log('new message', recievedMessage);
    var li = jQuery('<li></li>'); //create a new list element and give it the message text
    li.text(`${recievedMessage.from}: ${recievedMessage.text}`);

    jQuery('#messages').append(li); //append the list to the unordered list 
});

socket.on('newLocationMessage', function (message) {
    let li = jQuery('<li></li>');
    let a = jQuery('<a target="_blank">My current location</a>')

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.emit('createMessage', {
    from: 'Frank',
    text: 'hi'
}, function (data) {
    console.log('Got it', data);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {

    });
});

const locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) { //check if they have access to geolocation api
        return alert('Geolocation not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        alert('unable to fetch location');
    });
});
