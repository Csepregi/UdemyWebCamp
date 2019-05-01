//USER - email, name
var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    email: String,
    name: String, 
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId, // it's a mongoose object id belong to Post
            ref: "Post"
        }
    ]
});
module.exports = mongoose.model("User", userSchema); // it will send out the model, generate an object for us.  we cen return more of it, 