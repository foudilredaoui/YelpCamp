var express = require("express"),
    app = express(),
    bodyparser = require("body-parser"),
    mongoose = require("mongoose")
// var campgrounds = [{
//     name: "Salman Creek",
//     image: "https://pixabay.com/get/ec31b90f2af61c2ad65a5854ee4d459fe270e7c818b4134194f6c379a0ea_340.jpg"
// },
// {
//     name: "Granite Hill",
//     image: "https://pixabay.com/get/e136b80728f31c2ad65a5854ee4d459fe270e7c818b4134194f6c379a0ea_340.jpg"
// },
// {
//     name: "Mountain Goat's Rest",
//     image: "https://pixabay.com/get/ea34b50f2cf4013ed95c4518b7444795ea76e5d004b0144395f1c77ba7eab2_340.jpg"
// }
// ];

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyparser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");
// SCHEMA SEtUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var campground = mongoose.model("Campground", campgroundSchema);
// campground.create({
//     name: "Granite Hill",
//     image: "https://pixabay.com/get/e136b80728f31c2ad65a5854ee4d459fe270e7c818b4134194f6c379a0ea_340.jpg"
// },function(err,campground){
//   if(err){
//       console.log(err);
//   }else{
//       console.log("newly created campground :");
//       console.log(campground);
//   }
// });




app.get("/", function (req, res) {
    res.render("landing");
});
app.get("/campgrounds", function (req, res) {
    // get all campgrounds from db
    campground.find({}, function (err, campgrounds) {
        if (err) {
            Console.log(err);
        } else {
            res.render("campgrounds", {
                campgrounds: campgrounds
            });
        }
    });

});

app.post("/campgrounds", function (req, res) {
    // get data from form and add to the campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {
        name: name,
        image: image
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
    res.render("new");
});
app.listen(3000, function () {
    console.log(" the YelpCamp serverS has started");
});