const express = require('express')
const router = express.Router();
const Campground = require('../models/campgrounds')
const User = require('../models/user')

router.post("/campgrounds", function(req, res){
// CREATE A NEW CAMPGROUND
  const name = req.body.name;
  const image = req.body.image;

  const newCamp = {
    name:name, 
    image:image
  };

  Campground.create(newCamp,function(err, newlyCreated){
    User.findById({username: username}, function(err, foundUser){
      foundUser.Campground.push(newlyCreated)
      res.redirect("/campgrounds")
    })
  })

})

module.exports = router