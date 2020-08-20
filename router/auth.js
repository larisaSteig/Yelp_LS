const express = require('express')
const router = express.Router();
const passport= require('passport');
const User = require("../models/user.js");
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require ('passport-local-mongoose');
const middleware = require('../middleware/index.js')

// ***************************************** AUTHENTICATIONS ROUTES******************


router.get("/", function(req, res){
  res.render("index", {})
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

  User.register(newuser, password, function(err, user){
    if (err){
      return res.render("register",{"error": err.message})
    } 
     passport.authenticate("local")(req,res,function(){
      req.flash("success", "You are registered and can now log in.")
      res.redirect("/index/new")
    })
  })
})

router.post("/login",passport.authenticate("local",{
    successRedirect:"/index",
    failureRedirect: "/login",
    failureFlash: true
  }),
  function(res,res){
  })

  // LOGOUT ROUTE


// FUNCTION IS LOGGED IN
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "logged you out!")
  res.redirect("/")
})


  module.exports = router

