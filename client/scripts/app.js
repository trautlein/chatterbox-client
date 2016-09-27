var app = {

  mainURL: 'https://api.parse.com/1/classes/messages',
  server: 'https://api.parse.com/1/classes/messages?order=-createdAt',

  friends: [],
  rooms: {},


  init: function () {
    this.fetch();
    // setInterval(function() {
    //   app.fetch();
    // }, 100);
  },

  callback: function() {
    var message = {
      username: name,
      text: $('#message').val(),
      roomname: 'default'
    };

    return message;
  },

  send: function (input) {
    
    var message = input ? input : this.callback();

    $.ajax({
      url: this.mainURL,
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(message),
      success: function (data) {
        console.info('Sent: ' + JSON.stringify(message));
        $('#message').val('');
      }
    });
  },

  fetch: function () {
    $.ajax({
      url: this.server,
      type: 'GET',
      success: function (data) {
        app.clearMessages();
        console.log(data);

        app.rooms = {};
        $('#myDropdown').html('');

        for (var i = 0; i < data.results.length; i++) {
          // if (data.results[i].text === undefined) {
          //   continue;
          // }
          app.addRooms(data.results[i].roomname);
          app.renderMessage(data.results[i]);
        }

        console.log(app.rooms);


      }
    });
  },

  addRooms: function (roomname) {
    // room does exist already in object
    if (app.rooms.hasOwnProperty(roomname)) {
      app.rooms[roomname] += 1;
    // room doesn't exist yet in object
    } else {
      app.rooms[roomname] = 1;
      $('#myDropdown').append('<li>' + roomname + '</li>');
    }
  },
  
  clearMessages: function() {
    $('#chats').html('');
  }, 

  renderMessage: function(message) {
    // this tests for empty messages
    if (message.text !== undefined) {
      var textArray = message.text.split('');
      for (var j = 0; j < textArray.length; j++) {
        if (textArray[j] === '<') {
          textArray[j] = '&lt;';
        } else if (textArray[j] === '>') {
          textArray[j] = '&gt;';
        }
      }
      message.text = textArray.join('');
    }


    if (app.friends.includes(message.username)) {
      $('#chats').append('<div><span>' + message.username + '</span>: <span class="friend">' + message.text + '</span></div>');
    } else { 
      $('#chats').append('<div><span>' + message.username + '</span>: ' + message.text + '</div>');
    }
  }, 

  renderRoom: function(room) {
    $('#roomSelect').append('<a class="' + room + '"></a>');

  }

};



// document must be loaded completely before manipulating the DOM
$(document).ready( function () {

  app.init();

  $('.send').click( function () {
    app.send();
  });


  $('.retrieve').click( function () {
    app.fetch();
  });

  $(document).on('click', 'span', function (event) {
    var clickedUsername = event.currentTarget.textContent;
    var nameIndex;
    if (!app.friends.includes(clickedUsername)) {
      app.friends.push(clickedUsername);
    } else {
      var nameIndex = app.friends.indexOf(clickedUsername);
      app.friends = app.friends.slice(0, nameIndex).concat(app.friends.slice(nameIndex + 1));
    }
  });

  $(document).on('click', 'li', function (event) {
    var clickedRoom = event.currentTarget.textContent;
    console.log(clickedRoom);
  });
});

