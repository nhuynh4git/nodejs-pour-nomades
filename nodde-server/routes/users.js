var express = require('express');
var router = express.Router();


/* require locals*/
var authentication = require('../authentication');
var mockupData = require('../mock-up-data');
var userSerializer = require ('../serializers/user-serializer');



router.post('/', function(req, res, next) {
  //res.status(500).json({error: 'not implemented yet'});
  /* req.body.data = {
        type: "users",
        attributes: {
          name: "asdqwe",
          email: "asdqwe@asdwew.com"
        }
      }
  */
  var db = req.db;
  db.collection('users').find({
    $or:[
      {'name': req.body.data.attributes.name}, 
      {'email':req.body.data.attributes.email}
      ]
    }).toArray(function(err, data){
      if (data.length > 0){
        res.status(200).json({error:'User already ecxist'})
      } else {
        db.collection('users').insertOne({
          'name':req.body.data.attributes.name, 
          'email':req.body.data.attributes.email,
           'password':req.body.data.attributes.password
        }, function(err, results){
          if (err){
            throw err;
          }
          console.log(results);
          res.status(200).json(userSerializer.serialize(results.ops[0]));
        });
      };
    });
});

router.use(authentication.authenticatedRoute);

/* GET users listing. */
router.get('/', function(req, res, next) {
  var users = mockupData.users;
  var usersTab = [];
  for (var key in users){
  	if (users.hasOwnProperty(key)) {
  		usersTab.push(users[key]);
  	}
  }
  res.status(200).json(userSerializer.serialize(usersTab));
});

router.get('/:id', function(req, res, next) {
  var users = mockupData.users;
  var lFound = false;
  var index = 0;
  while ((!lfound) && (index < users.length())) {
  	if (users[index].id = req.params.id){
  		lfound = true;
  	} else {
  		index++;
  	}
  }
  if (lfound) {
  	res.status(200).json(userSerializer.serialize(users[index]));
  } else {
  	res.status(200).json(userSerializer.serialize(null));
  }
});

router.post('/:id', function(req, res, next) {
  res.send('respond with a resource users post id');
});

module.exports = router;
