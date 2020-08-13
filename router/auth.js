const express = require('express')
const router = express.Router();
const passport= require('passport');
const User = require("../models/user.js");
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require ('passport-local-mongoose');

// ***************************************** AUTHENTICATIONS ROUTES******************

router.get("/", function(req, res){
  res.render("landing", {})
})
router.get("/login", function(req, res){
  res.render("login", {})
})
router.get("/register", function(req, res){
  res.render("register", {})
})


router.post("/register", function(req,res){
  const username = req.body.username
  const password= req.body.password

  newuser = {
    username: username,
    
  }


//     User.count({ 'username': req.body.username }, function (err, count) { // check if user exists
//     if (err) throw err;

//     req.getValidationResult().then(function(result) {

//       const errors = result.array();

//       if (count>0) {
//         errors.push( { param: 'username', msg: 'That username is already in use.', value: 'u'} );
//       }
//       if (errors.length) {
//         res.render('auth/register', {
//           errors: errors
//         });
//       } else {
//          User.register(newUser, function(err, user) {  // create new user
//           if (err) throw err;
//           req.flash("success_msg", "You are registered and can now log in.");
//           res.redirect("/campgrounds/new");
//         });
//       }
//     });
//   });
// });

  User.register(newuser, password, function(err, user){
    if (err){
      console.log(err);
      return res.render('register')
    } 
     passport.authenticate("local")(req,res,function(){
      req.flash("success_msg", "You are registered and can now log in.")
      res.redirect("/index/new")
    })
  })
})

router.post("/login",passport.authenticate("local",{
    successRedirect:"/index/new",
    failureRedirect: "/login",
    failureFlash: true
  }),
  function(res,res){
  })

  // LOGOUT ROUTE


// FUNCTION IS LOGGED IN
router.get("/logout", function(req, res){
  req.logout();
  res.redirect("/")
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect("/login")
}
  module.exports = router

//   User.count({ 'username': req.body.username }, function (err, count) { // check if user exists
//     if (err) throw err;

//     req.getValidationResult().then(function(result) {

//       var errors = result.array();

//       if (count>0) {
//         errors.push( { param: 'username', msg: 'That username is already in use.', value: 'u'} );
//       }
//       if (errors.length) {
//         res.render('auth/register', {
//           errors: errors
//         });
//       } else {
//         var newUser = new User({
//           name: req.body.name,
//           username: req.body.username,
//           password: req.body.password,
//           city: req.body.city,
//           state: req.body.state,
//           country: req.body.country,
//           email: req.body.email
//         });
//         User.createUser(newUser, function(err, user) {  // create new user
//           if (err) throw err;
//           req.flash("success_msg", "You are registered and can now log in.");
//           res.redirect("/users/login");
//         });
//       }
//     });
//   });
// });