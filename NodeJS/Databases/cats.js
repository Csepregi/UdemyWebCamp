var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name: String, 
    age: Number, 
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

/*var geroge = new Cat({
    name: "Mr Norris", 
    age: 7, 
    temperament: "Evil"
});

geroge.save(function(err, cat){
    if(err){
        console.log("something went wrong")
    } else {
        console.log("we just saved cat to the db: ")
        console.log(cat)
    }
});*/


Cat.create ({
    name:"Snow White", 
    age: 15, 
    temperament: "Bland"
}, function(err, cat){
    if(err){
        console.log(err);
    } else {
        console.log(cat);
    }
})

Cat.find({}, function(err, cats){
    if(err){
        console.log("OH OH, ERROR");
        console.log(err)
    } else {
        console.log("All the Cats.....");
        console.log(cats);
    }
})




//adding  a new cat to the DB

//retrieve all cats from the DB and console.log each one