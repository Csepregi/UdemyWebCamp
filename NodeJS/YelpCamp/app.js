var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

 var campgrounds = [
        {name: "Salmon Creek", image: "https://m.ellaslist.com.au/system/articles/featured_images/000/002/240/original/summer_camp_for_adults.jpg?1504032697"},
        {name: "Granite Hill", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlctGqEdKYDOgKEu1OgoRvRmSFZeihxvaskI26JDqcPZijTYFu"},
        {name: "Mountain Goat's Rest", image: "https://st3.depositphotos.com/5385004/13275/i/1600/depositphotos_132751380-stock-photo-tent-camp-in-a-pine.jpg"}
        ];


app.get("/", function(req, res){
    res.render("landing")
});

app.get("/campgrounds", function(req, res){
        res.render("campgrounds", {campgrounds: campgrounds})
})

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs")
})


app.post("/campgrounds", function(req, res){
    //get data from form and add to campground array
    //redirect back to campgroound here
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.listen(3000, function() {
    console.log("The YelpCamp Server has started");
});