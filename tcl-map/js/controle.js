function initControl(map){
  //                //
  //  Control METRO //
  //                //

  //ALL
  var metroControlDiv = document.createElement('div');
  var metroControl = new ControlTypeTransport(metroControlDiv,map,METRO);

  metroControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.RIGHT].push(metroControlDiv);

  //LIGNE BY LIGNE
  for(var L in METRO){
    if(typeof(METRO[L]) === 'object') {
      var metroLigneControlDiv = document.createElement('span');
      var metroLigneControl = new ControlLigne(metroLigneControlDiv, map, METRO[L],METRO);

      metroLigneControlDiv.index = 1;
      map.controls[google.maps.ControlPosition.RIGHT].push(metroLigneControlDiv);
    }
  }

  //               //
  //  Control TRAM //
  //               //

  //ALL
  var tramControlDiv = document.createElement('div');
  var tramControl = new ControlTypeTransport(tramControlDiv,map,TRAM);

  tramControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.RIGHT].push(tramControlDiv);

  //LIGNE BY LIGNE
  for(var L in TRAM){
    if(typeof(TRAM[L]) === 'object') {
      var tramLigneControlDiv = document.createElement('span');
      var tramLigneControl = new ControlLigne(tramLigneControlDiv, map, TRAM[L],TRAM);

      tramLigneControlDiv.index = 1;
      map.controls[google.maps.ControlPosition.RIGHT].push(tramLigneControlDiv);
    }
  }

  /*
   //              //
   //  Control BUS //
   //              //

   //ALL
  var busControlDiv = document.createElement('div');
  var busControl = new ControlTypeTransport(busControlDiv,map,BUS);

  busControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.RIGHT].push(busControlDiv);
  */
}

function ControlTypeTransport(controlDiv,map,Type) {

  // Set CSS styles for the DIV containing the control
  // Setting padding to 5 px will offset the control
  // from the edge of the map
  controlDiv.style.padding = '5px';

  // Set CSS for the control border
  var controlUI = document.createElement('span');
  controlUI.className = 'But_Transport '+Type.Type;
  controlUI.style.backgroundColor = '#00FF00';
  controlUI.style.borderStyle = 'solid';
  controlUI.style.borderWidth = '1px';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to Hide/Unhide '+Type.Type;
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior
  var controlText = document.createElement('span');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '12px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = '<b>'+Type.Type+'</b>';
  controlUI.appendChild(controlText);
  // Setup the click event listeners: simply set the map to
  // Chicago
  google.maps.event.addDomListener(controlUI, 'click', function() {
    var childDiv = document.getElementsByClassName(Type.Type);
    if(Type.Display) {
      CacheTypeTransport(map, Type);
      controlUI.style.backgroundColor = "#FF0000";
      for(var key in childDiv){
        if(typeof(childDiv[key]) === 'object')
          childDiv[key].style.backgroundColor = "#FF0000";

      }
    } else {
      AfficheTypeTransport(map, Type);
      controlUI.style.backgroundColor = "#00FF00";
      for(var key in childDiv){
        if(typeof(childDiv[key]) === 'object')
          childDiv[key].style.backgroundColor = "#00FF00";
      }
    }
  });

}

function ControlLigne(controlDiv,map,Ligne,Type) {

  // Set CSS styles for the DIV containing the control
  // Setting padding to 5 px will offset the control
  // from the edge of the map
  controlDiv.style.padding = '5px';

  // Set CSS for the control border
  var controlUI = document.createElement('div');
  controlUI.className = 'But_Ligne '+Type.Type+' '+Ligne.Nom;
  controlUI.style.backgroundColor = '#00FF00';
  controlUI.style.borderStyle = 'solid';
  controlUI.style.borderWidth = '1px';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to Hide/Unhide '+Ligne.Nom;
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior
  var controlText = document.createElement('div');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '8px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = '<b>'+Ligne.Nom+'</b>';
  controlUI.appendChild(controlText);
  // Setup the click event listeners: simply set the map to
  // Chicago
  google.maps.event.addDomListener(controlUI, 'click', function() {
    if(Ligne.Display) {
      CacheLigne(map, Ligne);
      controlUI.style.backgroundColor = "#FF0000"
    } else {
      AfficheLigne(map, Ligne);
      controlUI.style.backgroundColor = "#00FF00"
    }
  });

}