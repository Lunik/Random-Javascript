/**
 * Created by guillaumemartinez on 14/02/15.
 */

/////////////
//   VAR   //
/////////////

var $WINDOWS = $(window);
var TERRAIN;
var $CONTAINER = $(".container");
var AUTO = true;
var SOLUCEPATH;
/////////////
//   OBJ   //
/////////////

/**
 * Case
 * @constructor init
 */
var Case = function(){

  //Initialisation
  this.init = function(id,x,y){
    this.id = id;
    this.x = x;
    this.y = y;
    this.html = "<div class='Case' id='"+this.id+"'></div>";
    this.selected = false;
    this.start = false;
    this.end = false;
    this.obstacle = false;
  };

  //Dessine la case dans le HTML
  this.draw = function(classId){
    $('.'+classId).append(this.html);
    if(this.start){
      this.color("#868A08");
    } else if(this.end){
      this.color("#00FF00");
    } else if(this.obstacle){
      this.color("#000000");
    }
  };

  //Change la couleur #FFFFFF
  this.color = function(code){
    $('#'+this.id).css('background',code);
  };

  //Selectionne une case et la met en rouge
  this.select = function(){
    if(!this.start && !this.end) {
      if (this.selected) {
        this.color("#FFFFFF");
        this.selected = false;
      } else {
        this.color("#FF0000");
        this.selected = true;
      }
    }
  };

};

/**
 * Terrain
 * @constructor init
 */
var Terrain = function(){

  //Initialisation
  this.init = function(width,height){
    this.width = width;
    this.height = height;
    this.cases = new Array();
    this.start = -1;
    this.end = -1;
    this.obstacles = new Array();
  };

  //Cree les cases et les ajoutes au terrain
  this.make = function(){
    var k=0;

    //cree les cases
    for(var i=0;i<this.height;i++){
      for(var j=0;j<this.width;j++){
        var c = new Case();
        c.init(k,j,i);
        this.cases[k] = c;
        k++;
      }
    }

    //Choisit le start
    var r = randInt(0,k-1);
    this.cases[r].start = true;
    this.start = r;

    //Choisit le end
    do{
      r = randInt(0,k-1);
    } while(this.cases[r].start);
    this.cases[r].end = true;
    this.end = r;

    //Ajoute les obstacles
    r = k/3;
    for(i= 0;i<r;i++){
      do{
        var r2 = randInt(1,k-1);
      } while(this.cases[r2].obstacle || this.cases[r2].start || this.cases[r2].end);
      this.cases[r2].obstacle = true;
      this.obstacles[i] = r2;
    }

  };

  //Dessine le terrain
  this.draw = function(classId){
    for(var i in this.cases){
      this.cases[i].draw(classId);
    }
  };

};

////////////////
//  Function  //
////////////////

function randInt(min,max){
  max++;
  return Math.floor((Math.random()*(max-min)) + min);
}

function getCaseFromId(id){
  return TERRAIN.cases[id];
}

function nextCaseId(Case, direction){
  var next;
  switch (direction){
    case "U":
      if(Case.y != 0) {
        next = Case.id - TERRAIN.width;
      }
      break;
    case "D":
      if(Case.y != TERRAIN.height-1){
        next = Case.id + TERRAIN.width;
      }
      break;
    case "L":
      if(Case.x%TERRAIN.width != 0){
        next = Case.id - 1;
      }
      break;
    case "R":
      if(Case.x%TERRAIN.width != TERRAIN.width-1){
        next = Case.id + 1;
      }
      break;
    default :
      next = null;
      break;
  }

  if(next){
    return next;
  } else {
    return "Outside Terrain";
  }
}

function dxyCases(c1,c2){
  return {
    dx: c1.x-c2.x,
    dy: c1.y-c2.y,
    dxa: Math.abs(c1.x-c2.x),
    dya: Math.abs(c1.y-c2.y)
  };
}

function relativePositionCases(c1,c2){
  var dxy = dxyCases(c1,c2);
  var pos = null;
  if(dxy.dx > 0){
    //A gauche
    dxy.px = "L";
  } else if(dxy.dx < 0){
    //A droite
    dxy.px = "R";
  }
  if(dxy.dy > 0){
    //Au dessus
    dxy.py = "U";
  } else if(dxy.dy < 0){
    //En dessous
    dxy.py = "D";
  }

  return dxy;
}

function inversDir(dir){
  switch (dir){
    case "U":
      return "D";
    case "D":
      return "U";
    case "L":
      return "R";
    case "R":
      return "L";
    default :
      return -1;
  }
}

function findOrderDir(dxy){
  var dir = new Array();
  if(dxy.dxa > dxy.dya){
    dir = dxy.px;
    dir += dxy.py;
    dir += inversDir(dxy.py);
    dir += inversDir(dxy.px);
  } else {
    dir = dxy.py;
    dir += dxy.px;
    dir += inversDir(dxy.px);
    dir += inversDir(dxy.py);
  }
  return dir;
}
function findPath(c1,c2,path,from){
  if(c1 && !c1.obstacle) {
    //Si c1 existe et non un obstacle
    var localPath = path;
    var pos = relativePositionCases(c1, c2);
    var order = findOrderDir(pos);
    localPath.push(c1);
    if(c1 == c2){
      //Si on a trouvé la fin
      return localPath;
    } else {
      //Si on a pas trouvé la fin
      var returnPath = new Array();
      for (var i in order) {
        //Pour toutes les directions refaire findPath
        var next = getCaseFromId(nextCaseId(c1, order[i]));
        if (localPath.indexOf(next) == -1) {
          //Si la case n'a pas deja ete faite
          var respath = findPath(next, c2, localPath, order[i]);
          if(respath.length < returnPath.length){
            //Si le nouveau chemin est plus court que l'ancien
            returnPath = respath;
          }
        }
      }
      return returnPath;
    }
  } else {
    return path;
  }

}

function Path(debut,fin){
  var path = new Array();
  findPath(debut,fin,path,"");
  return path;
}

function colorCases(cases){
  for(var i in cases){
    if(!cases[i].selected)
      cases[i].select();
  }
}
//////////////
//   Main   //
//////////////

function main(){
  $CONTAINER.html("");
  TERRAIN = new Terrain();
  var width = Math.floor($WINDOWS.width()/34);
  var height = Math.floor($WINDOWS.height()/34);
  TERRAIN.init(width,height);
  TERRAIN.make();
  TERRAIN.draw("container");
  var Tdebut = new Date();
  SOLUCEPATH = Path(getCaseFromId(TERRAIN.start),getCaseFromId(TERRAIN.end),new Array());
  var Tfin = new Date();
  var dt = Tfin - Tdebut;
  console.log("Date: "+Tdebut);
  console.log("Path find in: "+dt+"ms");

  colorCases(SOLUCEPATH);
}

main();

/////////////
//  Event  //
/////////////

$('.butReload').on('click',function(){
  main();
});