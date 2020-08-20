const path = require('path');
const express = require('express');
const flash = require('connect-flash');
const bodyParser =require ('body-parser');
const mongoose = require("mongoose");
const passport= require('passport');
const dotenv= require('dotenv').config()
const LocalStrategy = require('passport-local');
const router = express.Router();
const passportLocalMongoose = require ('passport-local-mongoose');
const methodOverride = require('method-override')

const User = require('./models/user')
const Campground = require('./models/campgrounds')
const Comment = require('./models/comment')

const mongoDB = process.env.MONGODB_URL;

// requiring routes
const auth = require('./router/auth');
const addCamp = require('./router/addCamp');
const comment = require('./router/comments');


// const campgrounds = require('./models/campgrounds');
// const seedDB = require('./seeds');
// ***************************************************/ ******* Set up default mongoose connection
mongoose.connect(mongoDB, { useUnifiedTopology: true,useNewUrlParser: true,useFindAndModify: false });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to DB...');
});
// ***************************************************************************


// seedDB();
const app = express()
app.use (require("express-session")({
  secret: "Yessi is the best dog ever",
  resave: false, 
  saveUninitialized: false
}))

app.use(bodyParser.urlencoded ({extended:true}));
// app.use(express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"))

app.set("view engine", "ejs")

// Always need when working with passwords
app.use(passport.initialize());
app.use(passport.session())
// reading, encoding and uncoding the the login information
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());

app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next()
})



app.use(auth)
app.use("/index", addCamp)
app.use("/index/:id/comments",comment)



// // FUNCTION IS LOGGED IN

// function isLoggedIn(req,res,next){
//   if(req.isAuthenticated()){
//     return next()
//   }
//   res.redirect("/login")
// }



const PORT = process.env.PORT || 3000;
app.listen (PORT, function(){
  console.log ("The YelpCamp Server is running")
})