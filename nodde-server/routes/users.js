var express = require('express');
var router = express.Router();


/* require locals*/
var authentication = require('../authentication');
var mockupData = require('../mock-up-data');
var userSerializer = require ('../serializers/user-serializer');


router.post('/', function(req, res, next) {
  res.status(500).json({error: 'not implemented yet'});
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
