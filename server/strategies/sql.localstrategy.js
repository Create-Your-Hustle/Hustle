require('dotenv').config()
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var encryptLib = require('../modules/encryption');
var pool = require('../modules/pool.js');
var FacebookStrategy = require('passport-facebook').Strategy

passport.serializeUser(function (user, done) {
  //nothing to do here as we use the username as it is
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  //again, we just pass the username forward
  done(null, obj);
});

// Does actual work of logging in
passport.use('local', new localStrategy({
  passReqToCallback: true,
  usernameField: 'username'
}, function (req, username, password, done) {
  pool.connect(function (err, client, release) {
    console.log('called local - pg');

    // assumes the username will be unique, thus returning 1 or 0 results
    client.query("SELECT * FROM users WHERE username = $1", [username],
      function (err, result) {
        var user = {};

        console.log('here');

        // Handle Errors
        if (err) {
          console.log('connection err ', err);
          done(null, user);
        }

        release();

        if (result.rows[0] != undefined) {
          user = result.rows[0];
          console.log('User obj', user);
          // Hash and compare
          if (encryptLib.comparePassword(password, user.password)) {
            // all good!
            console.log('passwords match');
            done(null, user);
          } else {
            console.log('password does not match');
            done(null, false, { message: 'Incorrect credentials.' });
          }
        } else {
          console.log('no user');
          done(null, false);
        }

      });
  });
}
));

passport.use('facebook', new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_APP_URL
},
  function (token, refreshToken, profile, done) {

    // asynchronous
    process.nextTick(function () {
      pool.connect(function (err, client, done) {

        if (err) {
          console.log('Error connecting to database', err)
          // Does this need to be here?  Can it even do anything?
          res.sendStatus(500);
        } else {
          client.query(`WITH existing_user AS (
            SELECT *
            FROM users 
            WHERE facebook_id = $1),
            new_user AS (
            INSERT INTO users (facebook_id)
            SELECT $1
            WHERE NOT EXISTS (
                SELECT facebook_id
                FROM users
                WHERE facebook_id = $1)
               returning *)
              SELECT * FROM existing_user UNION ALL
            SELECT * FROM new_user;`, [profile.id], function (error, result) {
              if (error) {
                console.log('Error making query', error)
                done(null, false);
              } else  {
                 done(null, result.rows[0])
              } 
            })
        }
      })
      // find the user in the database based on their facebook id
      // User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

      //     // if there is an error, stop everything and return that
      //     // ie an error connecting to the database
      //     if (err)
      //         return done(err);

      //     // if the user is found, then log them in
      //     if (user) {
      //         return done(null, user); // user found, return that user
      //     } else {
      //         // if there is no user found with that facebook id, create them
      //         var newUser            = new User();

      //         // set all of the facebook information in our user model
      //         newUser.facebook.id    = profile.id; // set the users facebook id                   
      //         newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
      //         newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
      //         newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

      //         // save our user to the database
      //         newUser.save(function(err) {
      //             if (err)
      //                 throw err;

      //             // if successful, return the new user
      //             return done(null, newUser);
      //         });
      //     }

      // });
    });

  }));
;



module.exports = passport;
