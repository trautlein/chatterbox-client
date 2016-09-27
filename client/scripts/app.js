var app = {

  mainURL: 'https://api.parse.com/1/classes/messages',
  server: 'https://api.parse.com/1/classes/messages?order=-createdAt',

  friends: [],


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
        for (var i = 0; i < data.results.length; i++) {
          app.renderMessage(data.results[i]);
        }
      }
    });
  },
  
  clearMessages: function() {
    $('#chats').html('');
  }, 

  renderMessage: function(message) {
    var textArray = message.text.split('');
    for (var j = 0; j < textArray.length; j++) {
      if (textArray[j] === '<') {
        textArray[j] = '&lt;';
      } else if (textArray[j] === '>') {
        textArray[j] = '&gt;';
      }
    }

    message.text = textArray.join('');

    if (app.friends.includes(message.username)) {
      $('#chats').append('<div><span>' + message.username + '</span>: <span class="friend">' + message.text + '</span></div>');
    } else { 
      $('#chats').append('<div><span>' + message.username + '</span>: ' + message.text + '</div>');
    }
  }, 

  renderRoom: function(room) {
    $('#roomSelect').append('<a class="' + room + '"></a>');
  },

  handleSubmit: function() {
    app.send();
  }

};



// document must be loaded completely before manipulating the DOM
$(document).ready( function () {

  app.init();

  $('.send').click( function () {
    app.handleSubmit();
  });


  $('.retrieve').click( function () {
    app.fetch();
  });
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
