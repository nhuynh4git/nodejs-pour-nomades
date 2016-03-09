/**
 * Created by leojpod on 2/22/16.
 */

var http = require('http');
var qs = require('querystring');
var url = require('url');
var routing = require('./routing.js');

var corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:4200",
  "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Max-Age": '86400', // 24 hours
  "Access-Control-Allow-Headers":
    "X-Requested-With, Access-Control-Allow-Origin," +
    " X-HTTP-Method-Override, Content-Type, Authorization, Accept, x-access-token"
};

http.createServer(function(request, response) {
  //TODO assurer vous de toujours renvoyer les CORS header dans votre response
  for (var header in corsHeaders){
    if (corsHeaders.hasOwnProperty(header)){
      response=setHeader(header, corsHeaders[header]);
    }  
  }
  //notre API fonctionne en JSON: on peut fixer le header une fois pour toute
  response.setHeader('Content-Type', 'application/json');

  //TODO analyser et extraire les informations sur la requête,
  // surcharger request avec et appeler:
  //    routing.routeRequest(request, response);
  // ! un cas particuler: si la requête est de type OPTIONS:
  // pas la peine d'aller plus loin, il suffit d'envoyer les headers CORS
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

    var reqUrl = url.parse(request.url, true);
    request.url = reqUrl;
    request.query = reqUrl.query;
    request.body = decodeBody;
    routing.routeRequest(request, response);
  });


}).listen(8888);
