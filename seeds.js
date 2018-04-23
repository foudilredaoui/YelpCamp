var mongoose = require("mongoose"),
    campground = require("./models/campground")

function seedDB() {
    // Remove all campgrounds
    campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("removed campgrounds");
    });
    //add a few campgrounds

}
 module.exports = seedDB;