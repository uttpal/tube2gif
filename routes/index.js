var express = require('express');
var router = express.Router();
const search = require("../controller/search.js")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/search', search);
module.exports = router;
