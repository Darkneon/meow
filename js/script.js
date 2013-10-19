jQuery(function($) {
  var $nicknameForm = $('#connect'),
    $nickname = $('#nickname'),
    $messageForm = $('#send-message'),
    $message = $('#message'),
    $chat = $('#chat'),
    $users = $('#users');

  var socket;

  $nicknameForm.submit(function(e) {
    e.preventDefault();
    socket = io.connect();
    var error;

    socket.emit('sign in', $nickname.val(), function(data) {
      if (data.status == 0) {
        for (i = 0; i < data.users.length; i++) {
          addUser(data.users[i]);
        }
        $('#splash').fadeOut('fast');
        $('#main').fadeIn('fast');
        $message.focus();
      } else {
        $('#connect .form-group').addClass('has-error');
        $('#connect .control-label').html("That nickname is already taken");
        error = true;
      }
    });

    if (error) return;
    
    $messageForm.submit(function(e) {
      e.preventDefault();
      socket.emit('new message', $message.val());
      $message.val('');
    });

    socket.on('new message', newMessage);
    socket.on('sign in', userJoined);
    socket.on('sign out', userLeft);
  });

  // event handlers

  var newMessage = function(data) {
    printMessage('<b>' + data.user + '</b>: ' + data.message);
  };

  var userJoined = function(data) {
    addUser(data);
    printMessage('<i>' + data + ' joined</i>');
  };

  var userLeft = function(data) {
    removeUser(data);
    printMessage('<i>' + data + ' left</i>');
  };

  // helpers

  function addUser(nickname) {
    $users.append(nickname + '<br>');
  }

  function removeUser(nickname) {
    $users.html($users.html().replace(nickname + '<br>', ''));
  }

  function printMessage(msg) {
    $chat.append(msg + '<br>');
  }
});