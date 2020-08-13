const path = require('path');
const express = require('express');

const bodyParser =require ('body-parser');
const mongoose = require("mongoose");
const passport= require('passport');
const dotenv= require('dotenv').config()
const LocalStrategy = require('passport-local');
// const passportLocalMongoose = require ('npm install');

const User = require('./models/user')

const mongoDB = process.env.MONGODB_URL;

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


const campgrounds = [
  {name: "Smoke", image:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS5vmzNoCm6BMBf-jvA_PQubAM_YNO6Co1rxg&usqp=CAU'},
  {name: "Little Cat", image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQsfchf2Sus-OEw0pIf49OdiaA8kSgrWz4SKg&usqp=CAU'},
  {name:'Grizzly', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR8hc5mulzODwEJlzuqyREe-jt5DWCSO4j1cg&usqp=CAU'},
  {name: "Smoke", image:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS5vmzNoCm6BMBf-jvA_PQubAM_YNO6Co1rxg&usqp=CAU'},
  {name: "Little Cat", image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQsfchf2Sus-OEw0pIf49OdiaA8kSgrWz4SKg&usqp=CAU'},
  {name:'Grizzly', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR8hc5mulzODwEJlzuqyREe-jt5DWCSO4j1cg&usqp=CAU'},
  {name: "Smoke", image:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS5vmzNoCm6BMBf-jvA_PQubAM_YNO6Co1rxg&usqp=CAU'},
  {name: "Little Cat", image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQsfchf2Sus-OEw0pIf49OdiaA8kSgrWz4SKg&usqp=CAU'},
  {name:'Grizzly', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR8hc5mulzODwEJlzuqyREe-jt5DWCSO4j1cg&usqp=CAU'}
]
// image:"img/one.jpg"

// {name: "Smoke", image:"https://www.reserveamerica.com/webphotos/racms/articles/images/bca19684-d902-422d-8de2-f083e77b50ff_image2_GettyImages-677064730.jpg"},
// {name: "Little Cat", image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQsfchf2Sus-OEw0pIf49OdiaA8kSgrWz4SKg&usqp=CAU'},
// {name:'Grizzly', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR8hc5mulzODwEJlzuqyREe-jt5DWCSO4j1cg&usqp=CAU'}


//  ************ROUTES
app.get("/", function(req,res){
  res.render("index");
})

app.get ("/secret", function(req,res){
  res.render("secret")
})
// GET route show everything we have
app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {gallery: campgrounds})
})

// POST roure gives us ability to add new campgrounds in
app.post("/campgrounds", function(req, res){
  // res.send( "you hit the post route")
  const name = req.body.name;
  const image = req.body.image;
  const newCamp = {name:name, image:image};
  campgrounds.push(newCamp)
  // get data from form and add to campground arrar and 
  // redirect back to gallery page ( campgrounds)
  res.redirect("/campgrounds")
})

// there is a form to fill up and send to POST /gallery
app.get("/campgrounds/new",isLoggedIn, function(req, res){
  res.render("new.ejs")
})

// // AUTH ROUTES

app.get("/register", function(req, res){
  res.render("register")
})

// // handling user sign up

app.post("/register", function(req,res){
  const username = req.body.username
  const password= req.body.password
  User.register(new User({username:username}), password, function(err, user){
    if (err){
      console.log(err);
      return res.render('register')
    } 
    // passport.authenticate("local")(req,res,function(){
      res.redirect("/campgrounds/new")
    // })
  })
})

//  LOGIN ROUTE
app.get("/login", function(req,res){
  res.render("login")
})

app.post("/login",passport.authenticate("local",{
  successRedirect:"/campgrounds/new",
  failureRedirect: "/login"
}),
function(res,res){
})

// LOGOUT ROUTE

app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/")
})

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