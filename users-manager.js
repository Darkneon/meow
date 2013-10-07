var CODES = require(__dirname + '/codes');

var users = {};
exports.signIn = function(username) {
  if (typeof users[username] === 'undefined') {
    users[username] = 1; // Set a value for now, will probably change in the future
    return CODES.STATUS.SUCCESS;
  } 
  else {
    return CODES.STATUS.ALREADY_EXISTS;
  }
};


