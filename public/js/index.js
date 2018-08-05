var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

});

socket.on('userLogin', function (message) {
    console.log('message from admin', message);
    const formattedTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>'); //create a new list element and give it the message text
    li.text(`${message.from} ${formattedTime}: ${message.text}`);

    jQuery('#messages').append(li); //append the list to the unordered list 
});

socket.on('newMessage', function (message) {
    console.log('new message', message);
    const formattedTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>'); //create a new list element and give it the message text
    li.text(`${message.from} ${formattedTime}: ${message.text}`);

    jQuery('#messages').append(li); //append the list to the unordered list 
});

socket.on('newLocationMessage', function (message) {
    //server sends an object to all clients with a link to google maps
    const formattedTime = moment(message.createdAt).format('h:mm a');
    let li = jQuery('<li></li>');
    let a = jQuery('<a target="_blank">My current location</a>')

    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'hi'
// }, function (data) {
//     console.log('Got it', data);
// });

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    let messageTextBox = jQuery('[name=message]')

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('');
    });
});

const locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) { //check if they have access to geolocation api
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...'); //disable 'send location' button so it cant be spammed

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled'); //re enable button on success
        locationButton.text('Send location');
        socket.emit('createLocationMessage', { //send coords to server then server sends out location message to all clients
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled');
        locationButton.text('Send location');
        alert('unable to fetch location');
    });
});
