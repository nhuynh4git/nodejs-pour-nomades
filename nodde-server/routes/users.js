var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource users get');
});

router.get('/:id', function(req, res, next) {
  res.send('respond with a resource user get id');
});

router.post('/', function(req, res, next) {
  res.send('respond with a resource users post');
});

router.post('/:id', function(req, res, next) {
  res.send('respond with a resource users post id');
});

module.exports = router;
