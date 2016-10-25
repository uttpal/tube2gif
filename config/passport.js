// config/passport.js


var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// get user model
var User = require('../models/user');
var passport = require('passport');
//get auth variables
var configAuth = require('./auth');

module.exports = function(passport) {

  // passport session setup --------------------------------------------------
  // -------------------------------------------------------------------------

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });


  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });



  // Google+ login ------------------------------------------------------------
  // ---------------------------------------------------------------------------

  passport.use(new GoogleStrategy({

      clientID: configAuth.googleAuth.clientID,
      clientSecret: configAuth.googleAuth.clientSecret,
      callbackURL: configAuth.googleAuth.callbackURL,

    },
    function(token, refreshToken, profile, done) {


      process.nextTick(function() {

        // try to find the user based on their google id
        User.findOne({
          'email': profile.emails[0].value
        }, function(err, user) {
          if (err)
            return done(err);

          if (user) {

            // if user found, log him in
            return done(null, user);
          } else {
            // if user not in DB create new
            var newUser = new User();

            // set all user params
            newUser.name = profile.displayName;
            newUser.email = profile.emails[0].value; // pull the first email

            // save the user
            newUser.save(function(err) {
              if (err)
                throw err;
              return done(null, newUser);
            });
          }
        });
      });

    }));

};
