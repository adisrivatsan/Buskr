var express = require("express");
var request = require('request');
var _ = require('underscore');
var mongoose = require('mongoose');
mongoose.connect('mongodb://adisri:buskr@ds029436.mlab.com:29436/buskrheatmap');

var heatMapSchema = mongoose.Schema({
  Day: Number,
  Month: Number,
  Year: Number,
  Amount: Number,
  Latitude: Number,
  Longitutde: Number,
  VendorName: String,
  City:String
})
var heatMap = mongoose.model('heatMap', heatMapSchema);


 var app = express();
 var port = process.env.PORT || 3000;
 app.use(express.static(__dirname));
 app.use(express.static(__dirname + '/Buskr\ Site'));
 app.use(express.static(__dirname + '/Buskr\ Site/js'));
  app.use(express.static(__dirname + '/Buskr\ Site/img'));
   app.use(express.static(__dirname + '/Buskr\ Site/fonts'));
    app.use(express.static(__dirname + '/Buskr\ Site/css'));
 app.get("/", function (req,res) {
 res.sendFile(__dirname + '/Buskr\ Site/index.html');
 })

 heatMap.find(function(err,data) {
   //console.log(data);
   app.get('/gatherData',function(req,res) {
     res.send(data); 
   })
 })

//console.log('hello');





 app.listen(port);
 console.log("listening on port " + port);
