/**
 * Created by leojpod on 3/7/16.
 */
var http = require('http');
var url = require('url');
var qs = require('querystring');
var Analysis = require('./analysis');

function handleRequest(request, response) {
  
  //TODO récupérer les informations sur la requete et remplir l'objet suivant:
  var analysisData = {
    method: null,
    url: null,
    path: null,
    params: {
      query: null,
      body: null
    }
  };

  
  /*TODO
  Une fois le tableau rempli, créer un Object Analysis (new Analysis(analysisData)
  et appeler la méthode displayJSON sur cet objet (il prend en paramètre
  l'objet response

  !! - vous devrez surement placer cet appel dans un callback!
   */
  var reqUrl = url.parse(requets.url, true);
  //affctation des valeurs
  analysisData.method = requets.method;
  analysisData.url = request.url;
  analysisData.path = reqUrl.pathname;
  analysisData.params.query = reqUrl.query;

  var bodyString = '';
  request.on('data', function(data) {
  bodyString += data;
  if (bodyString.length > 1e6) {
    // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
      request.connection.destroy();
    }
  });
  
  request.on('end', function() {
    // bodyString contient l’intégralité du corp de la requete, on peut donc en faire quelque chose
    var decodeBody;
    switch(request.headers[content-type]) {
      case 'application/x-www-form-urlencoded':
        decodeBody = qs.parse(bodyString);
        break;
      case 'applicaiton/json':
        decodeBody = JSON.parse(bodyString);
        break;
    default:
        decodeBody = bodyString;
    }  
   
    request.url = reqUrl;
    request.method = reqUrl.method;
    request.body = decodeBody;

  });


  /*TODO
  changer ensuite le code pour que ces informations soient disponible dans
  l'object request directement (ajouter/modifier dynamiquement des propriétés)
  utiliser analysis comme ceci une fois que votre objet request est surchargé:
  var analysis = new Analysis().analyseRequest(request).displayJSON(response);
  */

}

var server = http.createServer(handleRequest);
server.listen(8888);

console.log('server started');
