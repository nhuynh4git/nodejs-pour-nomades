/**
 * Created by leojpod on 2/23/16.
 */
var jwt = require('jsonwebtoken');

var mockUpData = require('./../mock-up-data');
var config = require('./../config');

var authentication = {
  /**
   * @param {String} nameOrEmail
   * @param {String} candidatePassword
   * @return boolean
   */
  authenticateUser: function(nameOrEmail, candidatePassword) {
    //TODO utiliser le contenu de mockup data pour valider ou refuser
    // l'authentification d'un utilisateur
    var john = mockUpData.users.john; 
    return (((john.email === nameOrEmail) || (john.name === nameOrEmail)) 
            && (john.password === candidatePassword));
  },

  isRequestAuthenticated: function(req, next) {
    //TODO chercher la présence du token d'authentification dans :
    // - body, query et headers (x-access-token)
    // utiliser jwt.verify pour s'assurer de la validité du token
    var token; 
    if (req.body.token != undefined) {
      token = req.body.token; 
    } else if (req.query.token != undefined) {
      token = req.query.token;
    } else if (req.headers['x-access-token'] != undefined) {
      token = req.headers['x-access-token']
    } else {
      return next(false);
    }
    jwt.verify(token,config.secretTokenKey, function(err, decoded){
      if (err) {
        next(false);
      } else {
        next (true);
      }
    })
  },

  handleRequest: function(req, res) {
    console.log('request for authentication');
    //TODO chercher la méthode de la requête et déterminer que faire:
    // - tenter d'authentifier l'utilisateur
    // - vérifier si la requête est authentifiée

    switch (req.method){
      case 'GET':
          this.isRequestAuthenticated (req, function(isAuth){
            if (isAuth){
              res.writeHead(200);
              res.write(JSON.stringify({success: true});
              res.end();
            } else {
              res.writeHead(200);
              res.write(JSON.stringify({success: false});
              res.end()
            }
          })
        break;
      case 'POST':
        // todo verifier si les informations login/password sont jsute
        // si non: renvoyer 403 
        // si oui: recuperer le token 
        jwt.sign({id: mockUpData.users.john.id}, config.secretTokenKey, function (token) {
          //et renvoyer 200 {token:token}
        });
        break;
      default :
      

    }

    res.writeHead(500);
    res.write('{ "error": "unimplemented"}');
    res.end();
  }
};

module.exports = authentication;
