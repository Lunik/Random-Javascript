// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('.searchBut').attr('disabled', false);
}

// Search for a specified string.
function search(query) {
  var queryOption = "part=snippet&key=AIzaSyAwHqNvste9i14y-h9iWngJeNCkmm4AXhw&type=video&videoDuration=any&order=date";
  $.getJSON("https://www.googleapis.com/youtube/v3/search?"+queryOption+"&q="+query,
    function(data) {
      var res = data.items;
      var formatedHtml = "<ul class='searchVideo'>";
      for(var i=0;i<res.length;i++){
        console.log(res[i]);
        formatedHtml += "<li class='searchVideoItem'>" +
        "<img src='"+res[i].snippet.thumbnails.default.url+"' />" +
        "<h3>"+res[i].snippet.title.substring(0,25)+"...</h3>" +
        "<button class='ajoutBut' id='" + res[i].id.videoId + "' title='"+res[i].snippet.title+"' duree=''>Ajouter</button>" +
        "</li>"
      }
      formatedHtml += "</ul>";
      var popup = new Popup();
      popup.init(null, null, 600, 550, "Recherche", formatedHtml);
      popup.draw();
    });
}