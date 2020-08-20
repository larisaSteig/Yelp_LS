const express = require('express')
const router = express.Router({mergerParams:true});
const Campground = require('../models/campgrounds')
const User = require('../models/user')
const middleware = require('../middleware/index.js')



// GET route show everything we have
router.get("/", function(req, res){
  Campground.find(function(err, images){
    if(err){
      console.log(err)
    } else {
    res.render("campgrounds/index",{gallery:images});
    }
  })
})

router.post("/", middleware.isLoggedIn, function(req, res){
// CREATE A NEW CAMPGROUND
  const name = req.body.name;
  const price = req.body.price;
  const image = req.body.image;
  const description = req.body.description;
  const author = {
    id: req.user._id,
    username: req.user.username
}


  const newCamp = {
    name:name, 
    price: price,
    image:image,
    description: description,
    author: author
  };
console.log(req.user)
  Campground.create(newCamp, function(err,data){
    if (err){
      console.log(err)
    } else {
       res.redirect ('/index')
    }
  })
})



// NEW ROUTES //  there is a form to fill up and send to POST /gallery
router.get("/new",middleware.isLoggedIn, function(req, res){
  res.render("campgrounds/new")
})

// SHOW route
router.get("/:id", function(req,res){
  Campground.findById(req.params.id).populate('comments').exec(function(err, foundCamp){
    // !foundCamp - means null value check Ian Youtube video for error handling
    if (err || !foundCamp){
      req.flash("error","Campground does not exist")
      res.redirect("back")
    } else (
       res.render("campgrounds/show",{campground:foundCamp})
    )
  })
})

// EDIT campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findById(req.params.id, function(err, foundCamp){
          res.render("campgrounds/edit", {campground:foundCamp})         
    })
})


// UPDATE campground
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
  //find an update a correct camp
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamp){
    if(err){
      res.redirect("/index")
    } else {
      res.redirect("/index/" + req.params.id)
    }
  } )
  //redirect to show page
})

// DESTROY campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/index")
    } else {
      res.redirect("/index")
    }
  })
})




module.exports = router