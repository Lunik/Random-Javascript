include("http://l2.io/ip.js?var=IP");
include("src/js/popup/popup.js");
include("http://www.youtube.com/player_api");
include("https://apis.google.com/js/client.js?onload=handleAPILoaded");
include("src/js/butEvent.js");
include("src/js/getVideo.js");
include("src/js/input.js");
include("src/js/player.js");
include("src/js/waitList.js");
include("src/js/search.js");
include("/socket.io/socket.io.js");

var VERSION = "1.0";

var socket = io();

var WL;
var PLAYER;
var IP;
function Main(){
  WL = new WaitList();
  WL.init(".waitList");

  //PLAYER = new Player();
  //PLAYER.init("",".player");
}

Main();
