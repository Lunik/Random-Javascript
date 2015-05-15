//////////////////////
//    Global Var    //
//////////////////////
var POKEMON;
var CURRENTPOKEMON;
var ALREADYFIND = new Array();
var SCORE = 0;
var ISSOUND = false;

//////////////////////
//     Function     //
//////////////////////

// Min >= Int > Max
function randIntBorne(min,max){
  return Math.floor((Math.random() * (max-min)) + min);
}

//////////////////////
//       Main       //
//////////////////////

//Recup liste pokemon
$.getJSON("json/pokemon.json",function(data){
  POKEMON = data.pokemon;
  initDataList('.dataPokemonList');
  main();
});

//Rempli la structure HTML dataliste
function initDataList(div){
  for(var key in POKEMON){
    $(div).append("<option value='"+POKEMON[key].nFr+"'></option>");
  }
}

function selectPokemon(){
  var id;
  do{
    id = randIntBorne(0,POKEMON.length);
  }while(ALREADYFIND.indexOf(id) != -1);
  setCurrentPokemon(id);
  return id;
}

function affichePokemon(id){
  var p = POKEMON[id-1];
  afficheSprite(getSprite(id));
}

function getSprite(id){
  var num = POKEMON[id-1].num;
  var url = "http://assets"+randIntBorne(1,20)+".pokemon.com/assets/cms2/img/pokedex/detail/"+num+".png";
  return url;
}

function afficheSprite(url){
  $('.pkmSprite').html("<img src='"+url+"' />");
  playSound("whoPokemon");
}

function afficherScore(){
  $('.scoreNb').html(SCORE);
}

function main(){
  resetInputName();
  afficherScore();
  affichePokemon(
    selectPokemon()
  );
}

function end(){
  $('.container').html("fini");
}

function setCurrentPokemon(id){
  CURRENTPOKEMON = POKEMON[id-1];
}

function checkValid(){
  var inputName = getInputName().toLowerCase();
  if(CURRENTPOKEMON.nFr.toLowerCase() == inputName || CURRENTPOKEMON.nEn.toLowerCase() == inputName){
    return true;
  }
  return false;
}

function error(){
  $('.inputName').css("border-color","#E00");
  playSound("itsPikachu");
}

function resetError(){
  $('.inputName').css("border-color","#000");
}

function getInputName(){
  return $('.inputName').val();
}

function resetInputName(){
  $('.inputName').val("");
}

function valider(){
  if(checkValid()){
    SCORE++;
    ALREADYFIND.push(CURRENTPOKEMON.num+1);
    main();
    resetError();
  } else {
    error();
  }
}

function playSound(nom){
  if(ISSOUND) {
    var sound = new Howl({
      urls: ["audio/" + nom + ".mp3"]
    }).play();
  }
}

function muteUnmute(){
  if(ISSOUND){
    ISSOUND = false;
    $(".inputSound").css("background","url('../../../../../images/but/mute.png')")
      .css("background-size","100%");
  } else {
    ISSOUND = true;
    $(".inputSound").css("background","url('../../../../../images/but/unmute.png')")
      .css("background-size","100%");
  }
}
///////////////////////
//       Event       //
///////////////////////

$('.inputValider').click(function(){
  valider();
});

$('.inputReload').click(function(){
  main();
});

$('.inputSound').click(function(){
  muteUnmute();
});

$(window).keydown(function(data){
  switch (data.keyCode){
    case 13:
      valider();
      break;
  }
  $('.inputName').focus();
  if($('.inputName').val().length == 1){
    $('.inputName').val(
      $('.inputName').val().toUpperCase()
    );
  }
});