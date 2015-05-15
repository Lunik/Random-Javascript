function initializeMetro(Json,Ligne,map){
  var point;
  var marker;
  var infowindow;
  Ligne.Type = "METRO";
  Ligne.Display = true;
  //          //
  //  LIGNE A //
  //          //

  //Define Ligne A
  Ligne.A = {
    "Nom":"A",
    "Display":true,
    "Arret":[],
    "Path":[]
  };

  //Init Arret Ligne A
  for(var arret in Json.data.A.Marker){
    point = new google.maps.LatLng(Json.data.A.Marker[arret].Lat, Json.data.A.Marker[arret].Long);
    if(Json.data.A.Marker[arret].Nom != null) {
      infowindow = new google.maps.InfoWindow({
        content: getContentInfo(Json.data.A.Marker[arret])
      });
      marker = new google.maps.Marker({
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: point,
        icon: "style/images/metroA.png",
        infowindow: infowindow
      });

      //Init Google Event Click
      initMarkerClickEvent(marker);

      //Arret Ligne A
      Ligne.A.Arret[Json.data.A.Marker[arret].Nom] = marker;
    }

    //Path Ligne A
    Ligne.A.Path.push(point);
  }

  //Define Ligne A
  Ligne.A.Itineraire = new google.maps.Polyline({
    path: Ligne.A.Path,
    geodesic: false,
    strokeColor: Json.data.A.couleur,
    strokeOpacity: 1.0,
    strokeWeight: 5
  });

  //          //
  //  LIGNE B //
  //          //

  //Define Ligne B
  Ligne.B = {
    "Nom":"B",
    "Display":true,
    "Arret":[],
    "Path":[]
  };
  //Init Arret Ligne B
  for(var arret in Json.data.B.Marker){
    point = new google.maps.LatLng(Json.data.B.Marker[arret].Lat, Json.data.B.Marker[arret].Long);
    if(Json.data.B.Marker[arret].Nom != null) {
      infowindow = new google.maps.InfoWindow({
        content: getContentInfo(Json.data.B.Marker[arret])
      });
      marker = new google.maps.Marker({
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: point,
        icon: "style/images/metroB.png",
        infowindow: infowindow
      });

      //Init Google Event Click
      initMarkerClickEvent(marker);

      //Arret Ligne B
      Ligne.B.Arret[Json.data.B.Marker[arret].Nom] = marker;
    }

    //Path Ligne B
    Ligne.B.Path.push(point);
  }

  //Define Ligne B
  Ligne.B.Itineraire = new google.maps.Polyline({
    path: Ligne.B.Path,
    geodesic: false,
    strokeColor: Json.data.B.couleur,
    strokeOpacity: 1.0,
    strokeWeight: 5
  });

  //          //
  //  LIGNE C //
  //          //

  //Define Ligne C
  Ligne.C = {
    "Nom":"C",
    "Display":true,
    "Arret":[],
    "Path":[]
  };
  //Init Arret Ligne C
  for(var arret in Json.data.C.Marker){
    point = new google.maps.LatLng(Json.data.C.Marker[arret].Lat, Json.data.C.Marker[arret].Long);
    if(Json.data.C.Marker[arret].Nom != null) {
      infowindow = new google.maps.InfoWindow({
        content: getContentInfo(Json.data.C.Marker[arret])
      });
      marker = new google.maps.Marker({
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: point,
        icon: "style/images/metroC.png",
        infowindow: infowindow
      });

      //Init Google Event Click
      initMarkerClickEvent(marker);

      //Arret Ligne C
      Ligne.C.Arret[Json.data.C.Marker[arret].Nom] = marker;
    }

    //Path Ligne C
    Ligne.C.Path.push(point);
  }

  //Define Ligne C
  Ligne.C.Itineraire = new google.maps.Polyline({
    path: Ligne.C.Path,
    geodesic: false,
    strokeColor: Json.data.C.couleur,
    strokeOpacity: 1.0,
    strokeWeight: 5
  });

  //          //
  //  LIGNE D //
  //          //

  //Define Ligne D
  Ligne.D = {
    "Nom":"D",
    "Display":true,
    "Arret":[],
    "Path":[]
  };
  //Init Arret Ligne D
  for(var arret in Json.data.D.Marker){
    point = new google.maps.LatLng(Json.data.D.Marker[arret].Lat, Json.data.D.Marker[arret].Long);
    if(Json.data.D.Marker[arret].Nom != null) {
      infowindow = new google.maps.InfoWindow({
        content: getContentInfo(Json.data.D.Marker[arret])
      });
      marker = new google.maps.Marker({
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: point,
        icon: "style/images/metroD.png",
        infowindow: infowindow
      });

      //Init Google Event Click
      initMarkerClickEvent(marker);

      //Arret Ligne D
      Ligne.D.Arret[Json.data.D.Marker[arret].Nom] = marker;
    }

    //Path Ligne D
    Ligne.D.Path.push(point);
  }

  //Define Ligne D
  Ligne.D.Itineraire = new google.maps.Polyline({
    path: Ligne.D.Path,
    geodesic: false,
    strokeColor: Json.data.D.couleur,
    strokeOpacity: 1.0,
    strokeWeight: 5
  });
}