var DIRECTION = {
	"BAS"    : 2,
	"GAUCHE" : 3,
	"DROITE" : 1,
	"HAUT"   : 0
}

var DUREE_ANIMATION = 2;
var DUREE_DEPLACEMENT = 8;

function Personnage(url, x, y, direction) {
	this.x = x; // (en cases)
	this.y = y; // (en cases)
	this.direction = direction;
	this.etatAnimation = -1;
	
	// Chargement de l'image dans l'attribut image
	this.image = new Image();
	this.image.referenceDuPerso = this;
	this.image.onload = function() {
		if(!this.complete) 
			throw "Erreur de chargement du sprite nommé \"" + url + "\".";
		
		// Taille du personnage
		this.referenceDuPerso.largeur = this.width / 4;
		this.referenceDuPerso.hauteur = this.height / 4;
	}
	this.image.src = "sprites/" + url;
}

Personnage.prototype.dessinerPersonnage = function(context) {
	var frame = 0; // Numéro de l'image à prendre pour l'animation
	var decalageX = 0, decalageY = 0; // Décalage à appliquer à la position du personnage
	if(this.etatAnimation >= DUREE_DEPLACEMENT) {
		// Si le déplacement a atteint ou dépassé le temps nécéssaire pour s'effectuer, on le termine
		this.etatAnimation = -1;
	} else if(this.etatAnimation >= 0) {
		// On calcule l'image (frame) de l'animation à afficher
		frame = Math.floor(this.etatAnimation / DUREE_ANIMATION);
		if(frame > 3) {
			frame %= 4;
		}
		
		// Nombre de pixels restant à parcourir entre les deux cases
		var pixelsAParcourir = 16 - (16 * (this.etatAnimation / DUREE_DEPLACEMENT));
		
		// À partir de ce nombre, on définit le décalage en x et y.
		if(this.direction == DIRECTION.HAUT) {
			decalageY = pixelsAParcourir;
		} else if(this.direction == DIRECTION.BAS) {
			decalageY = -pixelsAParcourir;
		} else if(this.direction == DIRECTION.GAUCHE) {
			decalageX = pixelsAParcourir;
		} else if(this.direction == DIRECTION.DROITE) {
			decalageX = -pixelsAParcourir;
		}
		
		// On incrémente d'une frame
		this.etatAnimation++;
	}
	/*
	 * Si aucune des deux conditions n'est vraie, c'est qu'on est immobile, 
	 * donc il nous suffit de garder les valeurs 0 pour les variables 
	 * frame, decalageX et decalageY
	 */
	
	context.drawImage(
		this.image, 
		this.largeur * frame, this.direction * this.hauteur, // Point d'origine du rectangle source à prendre dans notre image
		this.largeur, this.hauteur, // Taille du rectangle source (c'est la taille du personnage)
		// Point de destination (dépend de la taille du personnage)
		(this.x * 16) - (this.largeur / 2) + 9 + decalageX, (this.y * 16) - this.hauteur + 16 + decalageY,
		this.largeur, this.hauteur // Taille du rectangle destination (c'est la taille du personnage)
	);
}

Personnage.prototype.getCoordonneesAdjacentes = function(direction) {
	var coord = {'x' : this.x, 'y' : this.y};
	switch(direction) {
		case DIRECTION.BAS : 
			coord.y++;
			break;
		case DIRECTION.GAUCHE : 
			coord.x--;
			break;
		case DIRECTION.DROITE : 
			coord.x++;
			break;
		case DIRECTION.HAUT : 
			coord.y--;
			break;
	}
	return coord;
}

Personnage.prototype.deplacer = function(direction, map) {
	// On ne peut pas se déplacer si un mouvement est déjà en cours !
	if(this.etatAnimation >= 0) {
		return false;
	}

	// On change la direction du personnage
	this.direction = direction;
		
	// On vérifie que la case demandée est bien située dans la carte
	var prochaineCase = this.getCoordonneesAdjacentes(direction);
	if(prochaineCase.x < 0 || prochaineCase.y < 0 || prochaineCase.x >= map.getLargeur() || prochaineCase.y >= map.getHauteur() ||
    (map.WalkCase[prochaineCase.y][prochaineCase.x] != 1 && map.WalkCase[prochaineCase.y][prochaineCase.x] != -1)) {
    //console.log(prochaineCase.y+" "+prochaineCase.y);
    //console.log(joueur);
    //console.log(map.WalkCase[this.y][this.x]);
    if (map.WalkCase[this.y][this.x] == -1 && (prochaineCase.x < 0 || prochaineCase.y < 0 || prochaineCase.x >= map.getLargeur() || prochaineCase.y >= map.getHauteur())) {
			if(this.x == 0){
				return {"map":parseInt(params.map)-1};
			} else if (this.x == 29) {
				return {"map":parseInt(params.map)+1};
			} else if (this.y == 0) {
				return {"map":parseInt(params.map)+10};
			} else if (this.y == 29) {
				return {"map":parseInt(params.map)-10};
			}
		}

		// On retourne un booléen indiquant que le déplacement ne s'est pas fait, 
		// Ça ne coute pas cher et ca peut toujours servir
		return false;
	}

  // On effectue le déplacement
  this.x = prochaineCase.x;
  this.y = prochaineCase.y;
  //console.log(map.WalkCase[this.y][this.x]);
  // On commence l'animatio
  this.etatAnimation = 1;
		
	return true;
}
