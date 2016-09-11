var mongoose = require('mongoose');

mongoose.connect('mongodb://adisri:buskr@ds029436.mlab.com:29436/buskrheatmap');

var newCitySchema = mongoose.Schema({
    Day: Number,
    Month: Number,
    Year: Number,
    Amount: Number,
    Latitude: Number,
    Longitutde: Number,
    City:String
  })

var newCity = mongoose.model('San Jose', newCitySchema);

newCity.remove({}, function (err) {
  if (err) return handleError(err);
  // removed!
  });


