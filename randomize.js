//random dates within 1 year.
var mongoose = require('mongoose');
var Q = require('q').Promise;
var _ = require('underscore');
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



var randomObjects = [];

var createDBObj = function(city,listLong,listLat,amountList) {
  var emptyArr = [];
  var newCitySchema = mongoose.Schema({
    Day: Number,
    Month: Number,
    Year: Number,
    Amount: Number,
    Latitude: Number,
    Longitutde: Number,
    City:String
  })
  var newCity = mongoose.model(city, newCitySchema);

  for (var i = 0; i < listLong.length; i++) {
    var day = Math.round( Math.random() * 30 + 1);
    var month = Math.round(Math.random() * 12 + 1);
    var year = 2015;
    var amount = amountList[i];
    var latitude = listLat[i];
    var longitude = listLong[i];
    var city = city;
    emptyArr.push(Object.assign({}, {Day:day,Month:month,Year:year,
    Amount:amount, Latitude: latitude, Longitutde: longitude, City: city}));

  }
  var arrayFunc = [];
  for (var i = 0; i < emptyArr.length; i++) {
    arrayFunc.push(new newCity(emptyArr[i]).save());
  }
  Q.all(arrayFunc).then(function(data) {
    console.log('done');
  })



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


createDBObj('New Jersey',[1,2,3],[2,3,4],[3.4,5.6,6.7]);


/*for (var i = 0; i < 1000; i++) {
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


var obj = new heatMap({
  Day: 12,
  Month: 10,
  Year: 2015,
  Amount: 23.44,
  Latitude: 23.444,
  Longitutde: 56.333,
  VendorName: 'Ben'
})
var arrayFunc = [];
for (var i = 0; i < randomObjects.length; i++) {
  arrayFunc.push(new heatMap(randomObjects[i]).save());
}
Q.all(arrayFunc).then(function(data) {
  console.log('done');
})
 */
/*heatMap.find(function(err,data) {
var dataID = _.map(data, function(num) {
  return num._id;
})
/*var deleteArr = [];
for (var i = 0; i < dataID.length; i++) {
  deleteArr.push(heatMap.remove({_id:dataID[i]}));
}
Q.all(deleteArr).then(function(data) {
  console.log('finished');
})
}) */
