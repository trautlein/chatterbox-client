// Example of message format:
// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };
// 
var mainURL = 'https://api.parse.com/1/classes/messages';
var retrieveURL = mainURL + "?order=-createdAt"

var message = {
  username: 'TESTtestTESTtestTEST',
  text: 'TESTING 123 TESTING 123',
  roomname: 'other'
};

 
$(".send").click(function() {
  $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });
});

// should get all the data
$.ajax({
  url: retrieveURL,
  type: 'GET',
  dataType: 'json',
  success: function (data) {
    console.log(data);
  }
});

// document must be loaded completely before manipulating the DOM
$(document).ready( function () {
  $(".send").click( function () {
    console.log('clicked');

    $.ajax({
      url: 'https://api.parse.com/1/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
        console.log(JSON.stringify(message));
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });

  });


  $('.retrieve').click( function () {
    $.ajax({
      url: 'https://api.parse.com/1/classes/messages?order=-createdAt',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        console.log(data.results);
      }
    });
  });
});

// should post the data on click of item

