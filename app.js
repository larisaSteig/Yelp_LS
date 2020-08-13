const path = require('path');
const express = require('express');
const connectFlash = require('connect-flash');
const bodyParser =require ('body-parser');
const mongoose = require("mongoose");
const passport= require('passport');
const dotenv= require('dotenv').config()
const LocalStrategy = require('passport-local');
const router = express.Router();
const passportLocalMongoose = require ('passport-local-mongoose');

const User = require('./models/user')
const Campground = require('./models/campgrounds')


const mongoDB = process.env.MONGODB_URL;

const addCamp = require('./router/addCamp');
const auth = require('./router/auth');

const campgrounds = require('./models/campgrounds');
// ***************************************************/ ******* Set up default mongoose connection
mongoose.connect(mongoDB, { useUnifiedTopology: true,useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to DB...');
});
// ***************************************************************************


const app = express()
app.use (require("express-session")({
  secret: "Yessi is the best dog ever",
  resave: false, 
  saveUninitialized: false
}))

app.use(bodyParser.urlencoded ({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs")

// Always need when working with passwords
app.use(passport.initialize());
app.use(passport.session())
// reading, encoding and uncoding the the login information
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use(connectFlash());

app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  next()
})


//  ************ROUTES

app.get("/", function(req,res){
  res.render("landing");
})
app.get("/register", function(req, res){
  res.render("register")
})

app.get("/login", function(req,res){
  res.render("login")
})


// GET route show everything we have
app.get("/index", function(req, res){
  Campground.find(function(err, images){
    if(err){
      console.log(err)
    } else {
    res.render("index",{gallery:images});
    }
  })
})

// NEW ROUTES //  there is a form to fill up and send to POST /gallery
app.get("/index/new",isLoggedIn, function(req, res){
  res.render("new.ejs")
})

// SHOW route
app.get("/index/:id", function(req,res){
  campgrounds.findById(req.params.id, function(err, foundCamp){
    if (err){
      console.log(err)
    } else (
      res.render("show",{campground:foundCamp})
    )
  })

})



app.use(addCamp)
app.use(auth)

// FUNCTION IS LOGGED IN

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect("/login")
}



const PORT = process.env.PORT || 3000;
app.listen (PORT, function(){
  console.log ("The YelpCamp Server is running")
})