var crowds_counter = 1;
// constructor crowd function
var Crowd = function (location, users) {
  this.id = crowds_counter;
  crowds_counter += 1;
  this.location = location;
  this.users = users;
  var message_counter = 0;
  this.messages = [];
  this.addUser = function (new_user) {
    this.users.push(new_user);
    return this;
  }
  this.addMessage = function (user_id, name, content) {
    var message = {
      id: message_counter,
      user_id: user_id,
      name: name,
      content: content
    }
    message_counter += 1
    this.messages.push(message);
    return message;
  }
};

module.exports = Crowd;