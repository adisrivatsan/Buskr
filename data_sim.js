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

var newCitySchema = mongoose.Schema({
    Day: Number,
    Month: Number,
    Year: Number,
    Amount: Number,
    Latitude: Number,
    Longitutde: Number,
    City:String
})

var heatMap = mongoose.model('San Jose', newCitySchema);

heatMap.find(function(err, res) {
  console.log(res);
});




var randomObjects = [];

for (var i = 0; i < 1000; i++) {
  var day = Math.round( Math.random() * 30 + 1);
  var month = Math.round(Math.random() * 12 + 1);
  var year = 2015;
  var amount = Math.random() * 500 + 10;
  var plusOrMinus = Math.random() < 0.5 ? Math.random() * -1 : Math.random();
  var longitude = -121.93416595 + plusOrMinus * 0.0742765;
  var plusOrMinus = Math.random() < 0.5 ? Math.random() * -1 : Math.random();
  var latitude = 37.34505086 + plusOrMinus * 0.0742765;
  var city = 'San Jose'
  randomObjects.push(Object.assign({}, {Day:day,Month:month,Year:year,
  Amount:amount, Latitude: latitude, Longitutde: longitude, City: city}));
}

var distanceFunc = function(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

var weightedAmount = function(x, y, xlist, ylist) {
  var total = 0;
  for(var i = 0; i < xlist.length; i++) {
    total += 1/(distanceFunc(x, y, xlist[i], ylist[i]));
  }
  return (total * Math.random(0.25, 1) * 500)
}

//37.27077436
//-121.93141937

var SanJoseRand = function(numPoints) {
  var latitudes = [];
  var longitudes = [];
  var amounts = [];

  var hotspot_lat = [37.27077436];
  var hotspot_long = [-121.93141937];

  /*
  Center:
  37.34505086
  -121.93416595

  0.0742765
  */

  var center = [37.34505086, -121.93416595];
  var radius = 0.0742765
  for (var i = 0; i < numPoints; i++) {
    var plusOrMinus = Math.random() < 0.5 ? Math.random() * -1 : Math.random();
    var longitude = center[1] + plusOrMinus * radius;
    var plusOrMinus = Math.random() < 0.5 ? Math.random() * -1 : Math.random();
    var latitude = center[0] + plusOrMinus * radius;

    var amount = weightedAmount(latitude, longitude, hotspot_lat, hotspot_long);

    latitudes.push(latitude);
    longitudes.push(longitude);
    amounts.push(amount);

    return [latitudes, longitudes, amounts];
  }

}

//console.log(SanJoseRand(10));

/*

var heatMap = mongoose.model('heatMap', heatMapSchema);

heatMap.find(function(err, res) {
  json_object = JSON.stringify(res);
}

*/


