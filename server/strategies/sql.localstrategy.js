require('dotenv').config()
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var encryptLib = require('../modules/encryption');
var pool = require('../modules/pool.js');
var FacebookStrategy = require('passport-facebook').Strategy
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

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

    // assumes the username will be unique, thus returning 1 or 0 results
    client.query("SELECT * FROM users WHERE username = $1", [username],
      function (err, result) {
        var user = {};
        // Handle Errors
        if (err) {
          done(null, user);
        }

        release();

        if (result.rows[0] != undefined) {
          user = result.rows[0];
          // Hash and compare
          if (encryptLib.comparePassword(password, user.password)) {
            // all good!
            done(null, user);
          } else {
            done(null, false, { message: 'Incorrect credentials.' });
          }
        } else {
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
    pool.connect(function (err, client, release) {

      if (err) {
        // Does this need to be here?  Can it even do anything?
        res.sendStatus(500);
      } else {
        client.query(`WITH existing_user AS (
            SELECT *
            FROM users 
            WHERE facebook_id = $1),
            new_user AS (
            INSERT INTO users (facebook_id, display_name)
            SELECT $1, $2
            WHERE NOT EXISTS (
                SELECT facebook_id
                FROM users
                WHERE facebook_id = $1)
               returning *)
              SELECT * FROM existing_user UNION ALL
            SELECT * FROM new_user;`, [profile.id, profile.displayName], function (error, result) {
            release()
            if (error) {
              done(null, false);
            } else {
              done(null, result.rows[0])
            }
          })
      }
    })
  }));
;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
},
  function (accessToken, refreshToken, profile, done) {
    pool.connect(function (err, client, release) {

      if (err) {
        // Does this need to be here?  Can it even do anything?
        res.sendStatus(500);
      } else {
        client.query(`WITH existing_user AS (
      SELECT *
      FROM users 
      WHERE google_id = $1),
      new_user AS (
      INSERT INTO users (google_id, username)
      SELECT $1, $2
      WHERE NOT EXISTS (
          SELECT google_id
          FROM users
          WHERE google_id = $1)
         returning *)
        SELECT * FROM existing_user UNION ALL
      SELECT * FROM new_user;`, [profile.id, profile.emails[0].value], function (error, result) {
            release()
            if (error) {
              done(null, false);
            } else {
              done(null, result.rows[0])
            }
          })
      }
    })
  }
));


module.exports = passport;
