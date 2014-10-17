var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/crowd-surf', function(req, res) {
  res.render('crowd-surf');
});

module.exports = router;
