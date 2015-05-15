

/**
 * @brief Si on valide l'ajout de la video
 */
$('body').on('click','.ajoutBut',function(data){
  console.log(data);
  WL.add(data.currentTarget.id,data.currentTarget.title);
  popupClose();
  muteVideo();
  clearInput('.searchInput');
});

/**
 * @brief Play next video in WL
 */
$('body').on('click','.nextButton',function(){
  nextVideo();
});

$('body').on('click','.muteButton',function(){
  muteVideo();
});

/**
 * @brief Boutton rechercher
 */
$('body').on('click','.searchBut',function(){
  var inputData = getInput('.searchInput');
  if(inputData) {
    search(inputData);
    PLAYER.setVolume(0);
  }
  clearInput('.searchInput');
});

$(window).keydown(function(event){
  $('.searchInput').focus();
  if(event.which == 13){
    var inputData = getInput('.searchInput');
    if(inputData) {
      search(inputData);
      PLAYER.setVolume(0);
    }
    clearInput('.searchInput');
  }
});