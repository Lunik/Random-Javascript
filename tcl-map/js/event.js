//Init Google Event Click
function initMarkerClickEvent(marker){
  google.maps.event.addListener(marker, 'click', function() {
    console.log(marker);
    map.setZoom(15);
    map.setCenter(marker.getPosition());
    if (infoWindow) infoWindow.close();
    infoWindow = marker.infowindow;
    infoWindow.open(map,marker);
  });
}