// all middleware goes here
const Campground = require("../models/campgrounds");
const Comment = require("../models/comment");

const middlewareObj = {}

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, function (err, foundCamp) {
      if (err || !foundCamp) { 
        req.flash("error", "Campground is not found")
        res.redirect("back")
      } else {
        if (foundCamp.author.id.equals(req.user._id)) {
          next()
        } else {
          req.flash("error","You dont have permission")
          res.redirect("back")
        }
      }
    })
  } else {
    req.flash("error","You need to log in")
    res.redirect("back")
  }
}


middlewareObj.checkCommentOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
      if (err) {
        res.redirect("back")
      } else {
        if (foundComment.author.id.equals(req.user._id)) {
          next()
        } else {
          req.flash("error","You dont have permission")
          res.redirect("back")
        }
      }
    })
  } else {
    req.flash("error","You need to log in")
    res.redirect("back")
  }
}

middlewareObj.isLoggedIn = function(req,res,next){
  if(req.isAuthenticated()){
    return next()
  }
  req.flash("error", "You need to be logged in to do it.")
  res.redirect("/login")
}


module.exports = middlewareObj