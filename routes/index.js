var express = require('express');
var router = express.Router();
const search = require("../controller/search.js");
const dialog = require("../controller/dialog.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/search', search);
router.get('/dialog', dialog);
module.exports = router;
