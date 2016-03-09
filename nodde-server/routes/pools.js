var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource pools get');
});

router.get('/:id', function(req, res, next) {
  res.send('respond with a resource pools get id');
});

router.get('/:id/answers', function(req, res, next) {
  res.send('respond with a resource pools get id answer');
});

router.post('/:id/answers', function(req, res, next) {
  res.send('respond with a resource pools get id answer');
});

router.get('/:id/results', function(req, res, next) {
  res.send('respond with a resource pools get id results');
});

router.post('/', function(req, res, next) {
  res.send('respond with a resource pools post');
});

router.patch('/:id', function(req, res, next) {
  res.send('respond with a resource pools post id');
});







module.exports = router;
