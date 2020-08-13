const mongoose = require('mongoose');
const passportLocalMongoose = require ('passport-local-mongoose');

const UserSchema = new mongoose.Schema ({
  username:String,
  password: String,
  campgrounds : [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campgrounds'
  }]
})

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema)