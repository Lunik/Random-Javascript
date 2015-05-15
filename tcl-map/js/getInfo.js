//lit un fichier .json
function JsonRead(nom) {
  // Création de l'objet XmlHttpRequest
  var xhr = getXMLHttpRequest();

  // Chargement du fichier
  xhr.open("GET", 'json/' + nom + '.json', false);
  xhr.send(null);
  if(xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0))  // Code == 0 en local
    throw new Error("Impossible de charger la list nommée \"" + nom + "\" (code HTTP : " + xhr.status + ").");

  var JsonData = xhr.responseText;

  // Analyse des données
  var Data = JSON.parse(JsonData);
  this.title = Data.title;
  this.data = Data;

}

function getContentInfo(arret){
  var content =
    "<h1>"+arret.Nom+"</h1>"
    +"<p>"+arret.info+"</p>";
  return content;
}