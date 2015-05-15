var PLAYEROPTION = {
  'autoplay':1,
  'controls':0,
  'disablekb':0,
  'rel':0,
  'showinfo':0,
  'iv_load_policy':3
};

function setVideo(code){
  PLAYER.loadVideoById(code);
}


//Init Player principal
function onYouTubePlayerAPIReady() {
  PLAYER = new YT.Player('player', {
    height: '315',
    width: '560',
    videoId: '',
    playerVars:PLAYEROPTION,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// autoplay video
function onPlayerReady(event) {
  event.target.playVideo();
}

// when video ends
function onPlayerStateChange(event) {
  if(event.data === 0) {
    if(event.target.h.getAttribute('id') == "player")
      nextVideo();
  } else if(event.data === 2){
    PLAYER.playVideo();
  }
}

function muteVideo(){
  if(PLAYER.getVolume()) {
    PLAYER.setVolume(0);
    $('.muteButton').css("background-image","url('../../../../../images/but/mute_b.png')");
  } else {
    PLAYER.setVolume(100);
    $('.muteButton').css("background-image","url('../../../../../images/but/unmute_b.png')");
  }
}