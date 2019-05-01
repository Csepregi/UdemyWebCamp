var express                  = require("express"), 
    mongoose                 = require("mongoose"), 
    passport                 = require("passport"),
    bodyParser               = require("body-parser"),
    User                     = require("./models/user"),
    LocalStrategy            = require("passport-local"),
    passportLocalMongoose    = require("passport-local-mongoose")

mongoose.connect("mongodb://localhost: 27017/auth_demo_app", {useNewUrlParser: true});
var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({   //run it as a session, require and execute
        secret:"Rusty is the best and cutest dog in the world",  //it will be use to decode the session, there is no readeble data, it will be unincode
        resave: false,
        saveUninitialized: false
}))




app.use(passport.initialize()); //we need this two line anytime use passport
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));  //use passport local mongoose
passport.serializeUser(User.serializeUser());  
passport.deserializeUser(User.deserializeUser());

//==========
// ROUTES
//=======

app.get("/", function(req, res){
    res.render("home");
})

app.get("/secret", isLoggedIn, function(req, res){  //mielőtt megnyitja csekkolja, hogy be van e jelentkezve függvénnyel, ha hamis, akkor ez a 
    res.render("secret");                           //függvény 2. fele nem fut le
})

// AUTH ROUTE
app.get("/register", function(req, res){  // just to show the register form
    res.render("register");
})

//handling user sign up
app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){  //create a new user and hash the password
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){  //it's logged the user in / we use local packages, it can be twitter, ...| it's run the serialize function
            res.redirect("/secret"); //amint belépett elírányítjuk
        })
    })
})

//LOGIN ROUTES
//render login form
app.get("/login", function(req, res){ 
    res.render("login");
});

//login logic
app.post("/login",  passport.authenticate("local", {   //do as a second argument,  not in the callback function
    successRedirect: "/secret",                         //it's the middleware= some code runs before the final callback
    failureRedirect: "/login"                           //set between the begining of the route and the end of the route hands the nam middleware
}), function(req, res){ 
});    

app.get("/logout", function(req, res){
    req.logout(); //with passport it's easy
    res.redirect("/");
})

function isLoggedIn(req, res, next){  //these three are standard from middleware, next is the next thing has call, express take care of it
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login");
}


app.listen(3000, function(){
    console.log("server started")
})