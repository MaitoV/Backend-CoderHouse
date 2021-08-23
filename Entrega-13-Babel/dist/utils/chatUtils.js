"use strict";

var moment = require('moment');

var fs = require('fs');

var readFile = function readFile(fileName) {
  var readFile = fs.readFileSync("./".concat(fileName), 'utf-8');
  var fileParseado = JSON.parse(readFile);
  return fileParseado;
};

var addUser = function addUser(socketId, userEmail, avatarPic) {
  var newUser = {
    id: socketId,
    email: userEmail,
    avatar: avatarPic
  };
  var usersArray = readFile('users.json');
  usersArray.push(newUser);
  fs.writeFileSync('users.json', JSON.stringify(usersArray, null, '\t'));
  return newUser;
};

var findUser = function findUser(socketId) {
  var usersList = readFile('users.json');
  var userFound = usersList.filter(function (aUser) {
    return aUser.id === socketId;
  });
  return userFound;
};

var getUsers = function getUsers() {
  var usersArray = readFile('users.json');
  return usersArray;
};

var messageFormat = function messageFormat(email, msg, avatar) {
  var newMessage = {
    email: email,
    msg: msg,
    avatar: avatar,
    time: moment().format('DD/MM/YYYY | h:mm:ss')
  };
  var messagesArray = readFile('messages.json');
  messagesArray.push(newMessage);
  fs.writeFileSync('./utils/messages.json', JSON.stringify(messagesArray, null, '\t'));
  return newMessage;
};

var getRandomAvatar = function getRandomAvatar() {
  var randomNumber = Math.floor(Math.random() * (10 - 1)) + 1;
  return "avatar".concat(randomNumber);
};

module.exports = {
  addUser: addUser,
  getUsers: getUsers,
  messageFormat: messageFormat,
  findUser: findUser,
  getRandomAvatar: getRandomAvatar
};