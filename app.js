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

var genericSchema = mongoose.Schema({
  Day: Number,
  Month: Number,
  Year: Number,
  Amount: Number,
  Latitude: Number,
  Longitutde: Number,
  City:String
})

//ee9b2de1ee73875bcce3cd888ef9bd90
/*
{
  "code": 0,
  "message": "string",
  "objectCreated": {
    "_id": "string",
    "type": "p2p",
    "transaction_date": "2016-09-11",
    "status": "pending",
    "medium": "balance",
    "payer_id": "string",
    "payee_id": "string",
    "amount": 0.01,
    "description": "string"
  }
}
*/

/*
Object = Object.assign({}, {code:0, message:"Transaction",objectCreated: {_id:"wa2101012",type:"p2p",transaction_date:"2016-09-11",
status:"pending",medium:"balance",payer_id:"ac12e0casc",payee_id:"a12e0casc00",amount:0.01,description:"Transaction"}})
*/

/*

var customer = Object.assign({
  code: 0,
  message: "string",
  objectCreated: {
    _id: "string",
    first_name: "string",
    last_name: "string",
    address: {
      street_number: "string",
      street_name: "string",
      city: "string",
      state: "string",
      zip: "string"
    }
  }
})

superagent.post('http://api.reimaginebanking.com/accounts/?key=ee9b2de1ee73875bcce3cd888ef9bd90')
    .send(customer)
    .end(function(err) {
      console.log(err);
    });

superagent.get('http://api.reimaginebanking.com/accounts/?key=ee9b2de1ee73875bcce3cd888ef9bd90').end(function(res){
    console.log(res);
    console.log(res); //do something
});

*/


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

var newCitySchema = mongoose.Schema({
    Day: Number,
    Month: Number,
    Year: Number,
    Amount: Number,
    Latitude: Number,
    Longitutde: Number,
    City:String
  })

var San_Jose = mongoose.model('San Jose', newCitySchema);


San_Jose.find(function(err,data) {
   //console.log(data);

   app.get('/SanJoseData',function(req,res) {
     res.send(data);
   })
 })

 app.listen(port);
 console.log("listening on port " + port);
