function getSearchParameters() {
      var prmstr = window.location.search.substr(1);
      return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

function transformToAssocArray( prmstr ) {
    var params = {};
    var prmarr = prmstr.split("&");
    for ( var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params;
}

var params = getSearchParameters();

if(!params.map){
  params.map = 1;
}

var map = new Map(params.map);
var nextMap = false;
//var enemi = new Personnage("Enemi.png",1,1,DIRECTION.HAUT)
//map.addPersonnage(enemi);

if(!params.x || !params.y || !params.d){
  params.x = 7;
  params.y = 7;
  params.d = 2;
}

var joueur = new Personnage("Link.png", parseInt(params.x), parseInt(params.y), parseInt(params.d));
map.addPersonnage(joueur);


window.onload = function() {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	
	canvas.width  = map.getLargeur() * 16;
	canvas.height = map.getHauteur() * 16;
	
	setInterval(function() {
		map.dessinerMap(ctx);
	}, 40);
	
	// Gestion du clavier
	window.onkeydown = function(event) {
		// On récupère le code de la touche
		var e = event || window.event;
		var key = e.which || e.keyCode;
		
		switch(key) {
			case 38 : case 122 : case 119 : case 90 : case 87 : // Flèche haut, z, w, Z, W
				nextMap = joueur.deplacer(DIRECTION.HAUT, map);
        nextMap.FuturPos = {"x":joueur.x,"y":29};

				break;
			case 40 : case 115 : case 83 : // Flèche bas, s, S
				nextMap = joueur.deplacer(DIRECTION.BAS, map);
        nextMap.FuturPos = {"x":joueur.x,"y":0};
				break;
			case 37 : case 113 : case 97 : case 81 : case 65 : // Flèche gauche, q, a, Q, A
				nextMap = joueur.deplacer(DIRECTION.GAUCHE, map);
        nextMap.FuturPos = {"x":29,"y":joueur.y};
				break;
			case 39 : case 100 : case 68 : // Flèche droite, d, D
				nextMap = joueur.deplacer(DIRECTION.DROITE, map);
        nextMap.FuturPos = {"x":0,"y":joueur.y};
				break;
			default : 
				//alert(key);
				// Si la touche ne nous sert pas, nous n'avons aucune raison de bloquer son comportement normal.
				return true;
		}
		if(nextMap.map){
			location.replace('?map='+nextMap.map+"&x="+nextMap.FuturPos.x+"&y="+nextMap.FuturPos.y+"&d="+joueur.direction);
		}
		
		return false;
	}
	
	
	/*setInterval(function(){
		var dir = Math.floor((Math.random() * 4) + 1);
		switch(dir) {
			case 1 :
				enemi.deplacer(DIRECTION.HAUT, map);
				break;
			case 2 :
				enemi.deplacer(DIRECTION.BAS, map);
				break;
			case 3 :
				enemi.deplacer(DIRECTION.GAUCHE, map);
				break;
			case 4 :
				enemi.deplacer(DIRECTION.DROITE, map);
				break;
			default : 
				//alert(key);
				// Si la touche ne nous sert pas, nous n'avons aucune raison de bloquer son comportement normal.
				return true;
		}
	},1000);*/
}
