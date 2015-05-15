//Transport: Objet(Ligne)
function AfficheTypeTransport(map,Transport){
  Transport.Display = true;
  for(var L in Transport){
    if(typeof(Transport[L]) === 'object')
      AfficheLigne(map,Transport[L]);
  }
}

//Ligne: Objet(Arret,Itineraire)
function AfficheLigne(map,Ligne){
  Ligne.Display = true;
  AfficheArret(map,Ligne.Arret);
  AfficheItineraire(map,Ligne.Itineraire);
}

//Arret: Objet(Nom,Long,Lat)
function AfficheArret(map,Arrets){
  for(var i=0;i<Arrets.length;i++){
    Arrets[i].setMap(map);
  }
}

//Itineraire: Objet(Polyline)
function AfficheItineraire(map,Itineraire){
  Itineraire.setMap(map);
}

//Transport: Objet(Ligne)
function CacheTypeTransport(map,Transport){
  Transport.Display = false;
  for(var L in Transport){
    if(typeof(Transport[L]) === 'object')
      CacheLigne(map,Transport[L]);
  }
}

//Ligne: Objet(Arret,Itineraire)
function CacheLigne(map,Ligne){
  Ligne.Display = false;
  CacheArret(map,Ligne.Arret);
  CacheItineraire(map,Ligne.Itineraire);
}

//Arret: Objet(Nom,Long,Lat)
function CacheArret(map,Arrets){
  for(var i=0;i<Arrets.length;i++){
    Arrets[i].setMap(null);
  }
}

//Itineraire: Objet(Polyline)
function CacheItineraire(map,Itineraire){
  Itineraire.setMap(null);
}