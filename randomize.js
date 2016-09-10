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

//Left -122.04231
//Right -121.8255
//Up 37.42334
//Down 37.26426

var SanJoseRand = function(numPoints) {
  var latitudes = [];
  var longitudes = [];
  var amounts = [];

  var hotspot_lat = [37.809085,37.792879,37.80048,37.787938,37.79057,37.784681,37.690508,37.785798,37.778535,37.759816,37.784983,37.781147,37.782832,37.762033,37.725889,37.722769,37.723254,37.801339,37.790577,37.776565,37.794136,37.802899,37.785907,37.784118,37.791848,37.773765,37.791835,37.947719,37.32972,37.349098,37.349952,37.365674,37.370875,37.331436,37.336521,37.330736,37.326862,];
  var hotspot_long = [-122.417199,-122.397087,-122.401347,-122.407506,-122.405573,-122.407368,-122.473503,-122.402424,-122.389483,-122.426019,-122.432637,-122.484826,-122.463101,-122.434759,-122.451071-122.476717,-122.44384,-122.458599,-122.459872,-122.450261,-122.404939,-122.448774,-122.4008,-122.406435,-122.406843,-122.432495,-122.413343,-122.344712,-121.88963,-121.893496,-121.940608,-121.925342,-121.995473,-121.890214,-121.894321,-121.894228,-121.892093, -122.401347];

  /*
  Center:
  37.34505086
  -121.93416595

  0.0742765
  */
  console.log(hotspot_long.length);
  console.log(hotspot_lat.length);

  var center = [37.34505086, -121.93416595];
  var radius = 0.0742765
  for (var i = 0; i < numPoints; i++) {
    /*
    var plusOrMinus = Math.random() < 0.5 ? Math.random() * -1 : Math.random();
    var longitude = center[1] + plusOrMinus * radius;
    var plusOrMinus = Math.random() < 0.5 ? Math.random() * -1 : Math.random();
    var latitude = center[0] + plusOrMinus * radius;
    */
    var longitude = -122.04231 + (Math.random() * Math.abs(-121.8255 - -122.04231));
    var latitude = 37.26426 + (Math.random() * (37.42334 - 37.26426));
    var amount = weightedAmount(latitude, longitude, hotspot_lat, hotspot_long);

    latitudes.push(latitude);
    longitudes.push(longitude);
    amounts.push(amount);
  }
  return [latitudes, longitudes, amounts];

}

var array = SanJoseRand(1000);



createDBObj('San Jose',array[1] ,array[0], array[2]);


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
