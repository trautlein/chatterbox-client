var app = {

  mainURL: 'https://api.parse.com/1/classes/messages',
  server: 'https://api.parse.com/1/classes/messages?order=-createdAt',

  friends: [],
  rooms: {},
  currentRoom: '',


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
      roomname: app.currentRoom
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
    app.currentRoom = '';
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
      $('#myDropdown').append('<li>' + app.escape(roomname) + '</li>');
    }
  },
  
  clearMessages: function() {
    $('#chats').html('');
  },

  escape: function (input) {
    // if (input === undefined) {
    //   input = '++__WHY DOES THIS WORK__++';
    // }
    if (input !== undefined) {
      var textArray = input.split('');
      for (var j = 0; j < textArray.length; j++) {
        if (textArray[j] === '<') {
          textArray[j] = '&lt;';
        } else if (textArray[j] === '>') {
          textArray[j] = '&gt;';
        }
      }
      input = textArray.join('');
    }
    return input;
  },

  renderMessage: function(message) {
    if (app.friends.includes(message.username)) {
      $('#chats').append('<div><span>' + app.escape(message.username) + 
                          '</span>: <span class="friend">' 
                          + app.escape(message.text) + '</span></div>');
    } else { 
      $('#chats').append('<div><span>' + app.escape(message.username) + 
                        '</span>: ' + app.escape(message.text) + '</div>');
    }
  }, 

  renderRoom: function(room) {
    $.ajax({
      url: this.server,
      type: 'GET',
      success: function (data) {
        app.clearMessages();

        app.rooms = {};
        $('#myDropdown').html('');

        for (var i = 0; i < data.results.length; i++) {
          app.addRooms(data.results[i].roomname);
          if (data.results[i].roomname === room) {
            app.renderMessage(data.results[i]);
          }
        }

        console.log(app.rooms);
      }
    });

    // $('#roomSelect').append('<a class="' + room + '"></a>');

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
    app.currentRoom = clickedRoom;
    console.log(clickedRoom);
    app.renderRoom(clickedRoom);
  });
});

