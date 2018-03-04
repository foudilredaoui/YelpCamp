var express = require("express");
var app = express();
app.set("view engine","ejs");
app.get("/",function(req,res){
    res.render("landing");
});
app.get("/campgrounds",function(req,res){
    var campgrounds = [
        {name:"Salman Creek",image:""},
        {name:"Granite Hill",image:""},
        {name:"Mountain Goat's Rest",image:""}
    ]

res.render("campgrounds",{campgrounds:campgrounds});
});

app.listen(3000,function(){
 console.log(" the YelpCamp serverS has started");
});