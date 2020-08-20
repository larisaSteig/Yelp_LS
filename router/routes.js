const express = require('express')
const router = express.Router();
const Campground = require('../models/campgrounds')
const Comment = require('../models/comment')
const User = require('../models/user')

//  ************ROUTES

router.get("/", function(req,res){
  res.render("landing");
})
router.get("/register", function(req, res){
  res.render("register")
})

router.get("/login", function(req,res){
  res.render("login")
})

module.exports = router