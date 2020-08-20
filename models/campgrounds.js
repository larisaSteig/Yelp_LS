const mongoose = require('mongoose')
// const comment = require('./models/comment')

const campgroundsSchema = new mongoose.Schema (
{ name: String,
  price: String,
  image: String,
  description: String,
  author: {
    id: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "User"
    },
    username: String
 },
  comments : [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
})

module.exports = mongoose.model('Campgrounds', campgroundsSchema)

// author: {
//   id:{
//      type: mongoose.Schema.Types.ObjectId,
//      ref: 'User'
//    },
//    username : String
//   },