function initializeTram(Json,Ligne,map){
  var point;
  var marker;
  var infowindow;

  Ligne.Type = "TRAM";
  Ligne.Display = true;

  //            //
  //  LIGNE T1  //
  //            //
  //Define Ligne T1
  Ligne.T1 = {
    "Nom":"T1",
    "Display":true,
    "Arret":[],
    "Path":[]
  };
  //Init Arret Ligne T1
  for(var arret in Json.data.T1.Marker){
    point = new google.maps.LatLng(Json.data.T1.Marker[arret].Lat, Json.data.T1.Marker[arret].Long);
    if(Json.data.T1.Marker[arret].Nom != null) {
      infowindow = new google.maps.InfoWindow({
        content: getContentInfo(Json.data.T1.Marker[arret])
      });
      marker = new google.maps.Marker({
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: point,
        icon: "style/images/tramT1.png",
        infowindow: infowindow
      });

      //Init Google Event Click
      initMarkerClickEvent(marker);

      //Arret Ligne T1
      Ligne.T1.Arret[Json.data.T1.Marker[arret].Nom] = marker;
    }

    //Path Ligne T1
    Ligne.T1.Path.push(point);
  }

  //Define Ligne T1
  Ligne.T1.Itineraire = new google.maps.Polyline({
    path: Ligne.T1.Path,
    geodesic: false,
    strokeColor: Json.data.T1.couleur,
    strokeOpacity: 1.0,
    strokeWeight: 3
  });

  //            //
  //  LIGNE T2  //
  //            //
  //Define Ligne T2
  Ligne.T2 = {
    "Nom":"T2",
    "Display":true,
    "Arret":[],
    "Path":[]
  };
  //Init Arret Ligne T2
  for(var arret in Json.data.T2.Marker){
    point = new google.maps.LatLng(Json.data.T2.Marker[arret].Lat, Json.data.T2.Marker[arret].Long);
    if(Json.data.T2.Marker[arret].Nom != null) {
      infowindow = new google.maps.InfoWindow({
        content: getContentInfo(Json.data.T2.Marker[arret])
      });
      marker = new google.maps.Marker({
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: point,
        icon: "style/images/tramT2.png",
        infowindow: infowindow
      });

      //Init Google Event Click
      initMarkerClickEvent(marker);

      //Arret Ligne T2
      Ligne.T2.Arret[Json.data.T2.Marker[arret].Nom] = marker;
    }

    //Path Ligne T2
    Ligne.T2.Path.push(point);
  }

  //Define Ligne T2
  Ligne.T2.Itineraire = new google.maps.Polyline({
    path: Ligne.T2.Path,
    geodesic: false,
    strokeColor: Json.data.T2.couleur,
    strokeOpacity: 1.0,
    strokeWeight: 3
  });
}

function triPathAB(a,b) {
  if (a.id < b.id)
    return -1;
  else if (a.id > b.id)
    return 1;
  else
    return 0;
}

function triPathCD(a,b) {
  if (a.k < b.k)
    return -1;
  else if (a.k > b.k)
    return 1;
  else
    return 0;
}