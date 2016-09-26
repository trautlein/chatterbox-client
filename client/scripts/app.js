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

// document must be loaded completely before manipulating the DOM
$(document).ready( function () {
  $(".send").click( function () {
    $.ajax({
      url: mainURL,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent \n\n' + JSON.stringify(message));
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });

  });


  $('.retrieve').click( function () {
    $.get(retrieveURL, function(data) {
      console.log(data);
    });
  });
});

// should post the data on click of item
