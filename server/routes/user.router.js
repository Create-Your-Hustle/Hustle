var express = require('express');
var router = express.Router();
var passport = require('passport')

router.get('/select', function(req,res){

})

router.get('/facebook',
  passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: 'http://localhost:5000/#/home', successRedirect: 'http://localhost:5000/#/user' })
  );

  router.get('/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email'] }));

  router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:5000/#/login', successRedirect: 'http://localhost:5000/#/user' })
);

// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    var userInfo = {
      username : req.user.username,
      id: req.user.id
    };
    res.send(userInfo);
  } else {
    // failure best handled on the server. do redirect here.
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

// clear all server session information about this user
router.get('/logout', function(req, res) {
  // Use passport's built-in method to log out the user
  req.logOut();
  res.sendStatus(200);
});


module.exports = router;
