// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 5000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});
//
// Routing
app.use(express.static(__dirname + '/public'));

var usernames = {};

io.on('connection', function (socket) {
  var map1 = io.of("/map-1");
  var map2 = io.of("/map-2");
  var map11 = io.of("/map-11");
  var map12 = io.of("/map-12");
  map1.emit("login",'lol');
  map1.on("login",function(username){
    usernames[username] = username;
    map1.emit("login", {
      username: username
    });
    console.log("connection");
  });

  map1.on("deplacement", function(data){
    map1.emit("deplacement",{
      username: data.username,
      direction: data.direction
    });
    console.log('lol');

  });

});
