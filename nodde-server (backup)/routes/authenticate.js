var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource authenticate get');
});

router.post('/', function(req, res, next) {
  res.send('respond with a resource authenticate post');
});

module.exports = router;
