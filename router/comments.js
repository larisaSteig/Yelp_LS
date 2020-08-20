const express = require('express')
const router  = express.Router({mergeParams: true});
const Campground = require('../models/campgrounds')
const Comment = require('../models/comment')
const User = require('../models/user')
const middleware = require('../middleware/index.js')

// ==================================================
//Comments routes
//===============================

router.get("/new", middleware.isLoggedIn, function(req,res){
  // find camp by id
  Campground.findById(req.params.id,function(err, campground){
    if(err || !campground){
      req.flash("error", "Something is wrong")
      console.log(err)
    } else {
      res.render("comments/new",{campground: campground})
    }
  })
})

router.post('/', function(req, res){
  //lookup camp using ID  
   Campground.findById(req.params.id,function(err, campground){
      if(err || !campground){
        req.flash("error", 'Campground is not found!')
        res. redirect('/index')
      } else {  
         //create a new comment
         //connect new comment to camp
         //redirect
        Comment.create(req.body.comment, function(err,comment){
          if (err || !comment){
            req.flash("error","Something is wrong")
            req.redirect("/index")
          } else {
            comment.author.id = req.user._id;
            comment.author.username = req.user.username
            comment.save()
            campground.comments.push(comment);
            campground.save()
            req.flash("success","Comment is in!")
            res.redirect('/index/'+ campground._id);
          }
        })
     }
  })
})


//EDIT route
 router.get("/:comment_id/edit", middleware.checkCommentOwnership,  function(req, res){
   Campground.findById(req.params.id, function(err, foundCamp){
     if(err || !foundCamp){
       req.flash("error", "Campround is not found!")
       return res.redirect("back")
     } 
     Comment.findById(req.params.comment_id, function(err, foundComment){
      if (err || !foundComment){
        req.flash("error", "Comment is not found")
        res.redirect("back")
      } else {
        res.render("comments/edit", {campground_id:req.params.id, comment: foundComment})
      }
   })
  })
 })

//UPDATE route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if(err || !updatedComment){
      req.flash("error", "Something is wrong!")
      res.redirect("back")
    } else {
      res.redirect("/index/" + req.params.id)
    }
  })
})

router.delete("/:comment_id", middleware.checkCommentOwnership,function(req,res){ 
  Comment.findByIdAndRemove(req.params.comment_id,function(err){
    if(err){
      req.flash("error", "Something is wrong!")
      res.redirect("back")
    } else {
      req.flash("success","Comment deleted")
      res.redirect("/index/" + req.params.id)
    }
  })
})






module.exports = router