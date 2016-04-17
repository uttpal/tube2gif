'use strict';

var express = require('express');
var router = express.Router();
const search = require("../controller/search.js");
const dialog = require("../controller/dialog.js");
const gif = require("../controller/gif.js");
var passport = require('passport');
var app = require('../app.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/search', ensureAuthenticated, search);
router.get('/dialog', ensureAuthenticated, dialog);
router.post('/gif', ensureAuthenticated, gif);

//auth

router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// the callback after google has authenticated the user
router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/search',
    failureRedirect: '/'
  }));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});
module.exports = router;

// ensure that user is authenticated else redirect
function ensureAuthenticated(req, res, next) {

  if(req.isAuthenticated())
    return next();

  res.redirect('/');
}
