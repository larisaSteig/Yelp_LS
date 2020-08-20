const mongoose = require('mongoose')

const campgrounds = [
  {name: "Smoke", image:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS5vmzNoCm6BMBf-jvA_PQubAM_YNO6Co1rxg&usqp=CAU', author:{ id: {type: mongoose.Schema.Types.ObjectId,
  ref: "User"}, username: "daily"}, comment:{}},
  // {name: "Cloud's Rest", image:'https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg', author:{ id: {type: mongoose.Schema.Types.ObjectId,
  // ref: "User"}, comment:{}},
  // {name: "Desert Masa", image:'https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg', author:{ id: {type: mongoose.Schema.Types.ObjectId,
  // ref: "User"}, comment:{}},
 ]

module.exports = campgrounds