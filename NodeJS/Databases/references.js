var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost: 27017/blog_demo_2", {useNewUrlParser: true});

var Post = require("./models/post");
var User = require("./models/user");




User.create({
    email: "bob@gmail.com", 
    name: "Bob Belcher"
})

Post.create({
    title: "How heto cook the best burger pt. 4.", 
    content: "ello  dfdfdfd dfdf"
}, function(err, post){ // we not handle the error
    User.findOne({email: "bob@gmail.com"}, function(err, foundUser){   //once the post created we find the user we already created
        if(err){
            console.log(err)
        } else {
            foundUser.posts.push(post); // post reference to post in callback function we just created
            foundUser.save(function(err, data){ // save the user and print out tha data
                if(err){
                    console.log(err)
                } else {
                    console.log(data)
                }
            })
        }
    })
});

//Find User
//Find all posts for that user

// User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){  // populate the post and run (exec) // chaining th functions
//         if(err){
//             console.log(err);
//         } else {
//             console.log(user);
//         }
//     });
    