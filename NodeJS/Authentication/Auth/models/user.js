var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
})

UserSchema.plugin(passportLocalMongoose); //it's add methods which come with passport local mongoose packages to userschema e.g:serialize, deserialize

module.exports = mongoose.model("User", UserSchema);