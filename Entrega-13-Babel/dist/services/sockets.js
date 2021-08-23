"use strict";

var io = require('socket.io');

var _require = require('../utils/classProducts.js'),
    Products = _require.Products,
    arrayProducts = _require.arrayProducts;

var _require2 = require('../utils/chatUtils.js'),
    addUser = _require2.addUser,
    getUsers = _require2.getUsers,
    messageFormat = _require2.messageFormat,
    findUser = _require2.findUser,
    getRandomAvatar = _require2.getRandomAvatar;

var initWebsocketServer = function initWebsocketServer(httpServer) {
  var WSServer = io(httpServer);
  WSServer.on('connection', function (socket) {
    var message;
    console.log('Un nuevo cliente se conecto!');
    /* Websockets que controlan el chat */

    socket.on('initChat', function (userEmail) {
      //Elegimos un avatar random
      var newAvatar = getRandomAvatar(); //Socket que maneja el evento del ingreso de un nuevo usuario

      addUser(socket.client.id, userEmail, newAvatar); //Emito un mensaje de bienvenida solo al usuario que se acaba de unir

      newMessage = messageFormat(undefined, "".concat(userEmail, ", bienvenido al chat!"));
      socket.emit('welcome', newMessage); //Aviso a todos los usuarios conectados que se unio un nuevo usuario menos al que se acaba de unir

      newMessage = messageFormat(undefined, "".concat(userEmail, "! se unio al chat"));
      socket.broadcast.emit('userJoin', newMessage);
      var usersOnline = getUsers(); //Paso el listado actualizado de todos los usuarios

      WSServer.emit('getUsers', usersOnline);
    });
    socket.on('newMessage', function (msg) {
      var currentUser = findUser(socket.client.id);
      message = messageFormat(currentUser[0].email, msg, currentUser[0].avatar);
      WSServer.emit('updateMessages', message);
    });
    /* Websockets que controlan la creacion y actualizacion de los productos */

    var products = new Products();
    socket.on('getProducts', function () {
      socket.emit('productList', arrayProducts);
    });
    socket.on('create', function (data) {
      products.saveProduct(data.title, data.price, data.thumbnail, arrayProducts);
      myWSServer.emit('productList', arrayProducts);
    });
    socket.on('initChat', function (userEmail) {
      console.log('Un nuevo usuario inicializo el chat!');
    });
  });
  return WSServer;
};

module.exports = initWebsocketServer;