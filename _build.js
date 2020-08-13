// import mongoose
const mongoose = require("mongoose");
// import dotenv
const dotenv = require("dotenv");
dotenv.config();

// Import seed data
const dbSeed = require('./seeds/campground.js');

// Define model
const Campgrounds = require('./models/campgrounds.js')

// /*******************************/
// /* Mongoose/MongoDB Connection */
// /*******************************/

const dbURI = process.env.MONGODB_URL;
mongoose.connect(dbURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

var db = mongoose.connection;

db.on('error', function(error){
  console.log(`Connection Error: ${error.message}`)
});

db.once('open', function() {
  console.log('Connected to DB...');
  Campgrounds.insertMany(dbSeed, function(error, animal) {
    console.log('Data import completed.')
    mongoose.connection.close();
  });
});