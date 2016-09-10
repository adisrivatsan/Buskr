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



var buskerSchema = mongoose.Schema({


})
var heatMap = mongoose.model('heatMap', heatMapSchema);

heatMap.find(function(err, res) {
  json_object = JSON.stringify(res);
}


