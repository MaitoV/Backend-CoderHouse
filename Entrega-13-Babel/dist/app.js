"use strict";

var express = require('express');

var path = require('path');

var apiRouter = require('./routes/api.js');

var http = require('http');

var initWebsocketServer = require('./services/sockets');

var app = express();
var port = 8080;
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express["static"](path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
var httpServer = http.Server(app);
initWebsocketServer(httpServer);
httpServer.listen(port, function () {
  return console.log('Server up en puerto', port);
});
app.use('/api', apiRouter);
app.use('/', function (req, res) {
  res.render('main');
});