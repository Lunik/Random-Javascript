var VIDEOINFO = {
  title: null,
  duree: null
};

var Video = function(){
  this.init = function(code){
    this.code = code;
    this.nom = info.nom;
    this.duree = info.duree;
  };

  this.getUrl = function(){
    return "http://youtu.be/"+this.code;
  }
};

/**
 * @brief Ouvre un popup avec l'url de la video youtube passe en parametre
 * @param url Url d'une video youtube
 */
function videoToPopup(url){
  var code = getVideoCode(url);
  var popup = new Popup();
  if(isCodeValid(code)){
    var html = '<div id="popupPlayer"></div>' + '<button class="ajoutBut" id="'+code+'" disabled>Wait...</button> ';
    var title = "";
  } else {
    var html = "<ul></ol><li>Video URL invalide</li></ul>";
    var title = "Error";
  }

  popup.init(null, null, 570, 370, title, html);
  popup.draw();
  setTimeout(function(){
    $('.ajoutBut')
      .prop('disabled',false)
      .html("Ajouter");
  },5000);
  var player = new YT.Player('popupPlayer', {
    height: '315',
    width: '560',
    videoId: code,
    playerVars:PLAYEROPTION,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

/**
 * @brief Attrape le code d'une video youtube depuis un url youtube
 * @param url Url d'une video youtube
 * @returns string Code d'une video youtube / null si url invalide
 */
function getVideoCode(url){
  var code = url.split("v=")[1];
  if (!code) {
    code = url.split("youtu.be/")[1];
    if(!code){
      code = url.split("embed/")[1];
    }
  }
  if(code)
    code = code.split("&")[0];
  else if(url.length == 11)
    code = url;
  return code;
}

/**
 * @brief Execute callBack si le code Youtube est valide sinon errorCallBack
 * @param code Code d'un video youtube
 * @param callBack Fonction a exectuter si le code Youtube est valide
 * @param errorCallBack Fonction a exectuter si le code Youtube n'est pas valide
 */
function isCodeValid(code){
  if(code && code.length == 11)
    return true;
  return false;
}

/**
 * @brief Conver seconds to MM:SS
 * @param seconds Seconds
 * @returns {string} MM:HH
 */
function secondsToMMSS(seconds){
  var minutes = Math.floor(seconds/60);
  if(minutes<10)
    minutes = "0"+minutes;
  var seconds = seconds%60;
  if(seconds<10)
    seconds = "0"+seconds;
  return minutes+":"+seconds;
}