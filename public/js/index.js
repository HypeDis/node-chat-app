var socket = io();

function scrollToBottom () {
    // Selectors 
    let messages = jQuery('#messages');
    let newMessage = messages.children('li:last-child');
    //heights
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    console.log('Connected to server');

});

socket.on('newMessage', function (message) {
    const formattedTime = moment(message.createdAt).format('h:mm a');

    let template = jQuery('#message-template').html(); //html() returns the inner html of the selected element.
    //creates a template using  formatting in "message-template" 
    //  found in index.html
    let html = Mustache.render(template, { //uses values from the object to fill in the template. 
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html); 
    scrollToBottom();
});


socket.on('newLocationMessage', function (message) {
    //server sends an object to all clients with a link to google maps
    const formattedTime = moment(message.createdAt).format('h:mm a');

    let template = jQuery('#location-message-template').html();
    let html = Mustache.render(template, { 
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
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
