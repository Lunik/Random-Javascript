var WaitList = function(){
  this.init = function(className) {
    this.list = new Array();
    this.nb = 0;
    this.total = 0;
    this.className = className;
  };
  /**
   * @brief Ajoute le code à la Wait List
   * @param code
   */
  this.add = function(code,title){
    var index = this.list.indexOf(code);
    if (index == -1) {
      this.list.push(code);
      this.nb++;
      this.total++;

      socket.emit("addWL",{
        "code": code,
        "title": title
      });

      if(PLAYER.getPlayerState() == 0 || PLAYER.getPlayerState() == -1) {
        this.playNext();
      } else {
        $(this.className).append("<div class='waitListElement' id='" + code + "'>");

        if (this.total % 2)
          $('#' + code + ".waitListElement").attr("class",
            $('#' + code + ".waitListElement").attr("class") + " impaire"
          );

        $(this.className + " #" + code)
          .append("<div class='videoName'>")
          .append("<div class='videoDuree'>")
          .append("<button class='videoRemove' id='" + code + "'></button>");

        $("#" + code + ".waitListElement .videoName").append(title);
        $("#" + code + ".waitListElement .videoDuree").append(null);
        $(this.className).on('click', '#' + code + '.videoRemove', function () {
          WL.remove(code);
        });
      }
    }
  };

  /**
   * @brief Retire le code de la Wait List
   * @param code
   */
  this.remove = function(code){
    var index = this.list.indexOf(code);
    if(index != -1){
      this.list.splice(index,1);
      this.nb--;

      $(this.className+" #"+code).remove();
    }
  };

  /**
   * @brief Vide la Wait List
   */
  this.clear = function(){
    this.list = new Array();
    this.nb = 0;
  };

  /**
   * @brief Play next video in WL
   */
  this.playNext = function(){
    var code = this.list[0];
    if(code) {
      console.log("next");
      PLAYER.loadVideoById(code);
      this.remove(code);
    }
  }
};

/**
 * @brief Play next Video in WL / if WL empty replay
 */
function nextVideo(){
  if(WL.list.length != 0)
    WL.playNext();
  else
    PLAYER.playVideo();
}