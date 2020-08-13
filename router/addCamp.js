const express = require('express')
const router = express.Router();
const Campground = require('../models/campgrounds')
const User = require('../models/user')

router.post("/index", function(req, res){
// CREATE A NEW CAMPGROUND
  const name = req.body.name;
  const image = req.body.image;

  const newCamp = {
    name:name, 
    image:image
  };

  Campground.create(newCamp,function(err,data){
    if (err){
      console.log(err)
    } else {
      console.log(data)
      res.redirect ('/index')
    }
  })
})

// function isLoggedIn(req,res,next){
//   if(req.isAuthenticated()){
//     return next()
//   }
//   res.redirect("/login")
// }
module.exports = router