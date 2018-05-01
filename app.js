var express = require("express"),
    app = express(),
    bodyparser = require("body-parser"),
    mongoose = require("mongoose"),
    campground = require("./models/campground"),
    Comment = require("./models/comment"),
    // User = require("./models/user"),
    seedDB = require("./seeds")
    


mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyparser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");
seedDB();

app.get("/", function (req, res) {
    res.render("landing");
});
app.get("/campgrounds", function (req, res) {
    // get all campgrounds from db
    campground.find({}, function (err, campgrounds) {
        if (err) {
            Console.log(err);
        } else {
            res.render("campgrounds/index", {
                campgrounds: campgrounds
            });
        }
    });

});

app.post("/campgrounds", function (req, res) {
    // get data from form and add to the campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {
        name: name,
        image: image,
        description:desc
    };
    // create a new campground and save to the DB
    campground.create(newCampground, function (err, newlycampground) {
        if (err) {
            console.log(err);
        } else {
            //redirect back to campgrounds page 
            res.redirect("/campgrounds");
        }
    });

});

app.get("/campgrounds/new", function (req, res) {
    res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function (req, res) {
    //find the campground with provided id
    campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            //render show template with that campground
            res.render("campgrounds/show",{campground:foundCampground});
        }
    });

});
//==================
// COMMENTS ROUTES
//==================
app.get("/campgrounds/:id/comments/new",function(req,res){
    //find campgrouond by id
    campground.findById(req.params.id,function(err,campground){
        if (err) {
            console.log(err);
        }else{
            res.render("comments/new",{campground: campground});
         
        }
    })
});

app.post("/campgrounds/:id/comments",function(req,res){
    // lookup campground using ID
    campground.findById(req.params.id,function(err,campground){
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment,function(err,comment){
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/'+campground._id);
                }
            });
        }
    })
    // create new comment
    //connect new comment to campground
    //redirect campground show page
});
app.listen(3000, function () {
    console.log(" the YelpCamp serverS has started");
});