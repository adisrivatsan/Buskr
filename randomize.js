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

var heatMap = mongoose.model('heatMap', heatMapSchema);
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
