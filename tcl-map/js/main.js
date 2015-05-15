function initialize() {
  mapOptions = {
    center: { lat: 45.750631, lng: 4.851903},
    zoom: 13,
    styles: [
      {
        featureType: "transit",
        stylers: [{ visibility: "off" }]
      }
    ]
  };
   map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

  initializeMetro(MARKER_METRO,METRO,map);
  AfficheTypeTransport(map,METRO);

  initializeTram(MARKER_TRAM,TRAM,map);
  AfficheTypeTransport(map,TRAM);
  /*
  initializeBus(MARKER_BUS,BUS,map);
  AfficheTypeTransport(map,BUS);
  */
  initControl(map);

  google.maps.event.addListener(map, 'click', function (event) {
    console.log(event.latLng);
  });
}
var map;
var mapOptions;
var infoWindow;

var MARKER_METRO = new JsonRead("metro");
var METRO = {};

var MARKER_TRAM = new JsonRead("tram");
var TRAM = {};
/*
var MARKER_BUS = new JsonRead("bus");
var BUS = {};
*/
google.maps.event.addDomListener(window, 'load', initialize);