const mongoose = require('mongoose')


const campgroundsSchema = new mongoose.Schema (
{ name: String,
  image: String

}
)

module.exports = mongoose.model('Campgrounds', campgroundsSchema)