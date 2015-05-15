var socket = io("/map-"+params.map);
  var username;
  socket.emit("login",username);

  socket.on("login",function(data){
    var joueur = new Personnage("Link.png", parseInt(params.x), parseInt(params.y), parseInt(params.d));
    map.addPersonnage(joueur);
    console.log(data.username+" connected");
  });
