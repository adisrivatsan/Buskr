var request = require('request');
var _ = require('underscore');

var arr = [1,2,3,4];
for(num in arr) {
  console.log(num);
}

//merchants
request.get('http://api.reimaginebanking.com/enterprise/merchants?key=373b787e00e0d2850be71e1331dea240',function(err,res,body) {
  //console.log(body);
  var actualBod = JSON.parse(body);
  var merchants = actualBod.results;
  //console.log(merchants);
  //console.log(results);
  var address = _.filter(merchants, function(num) {
    return num.address.city == 'Arlington';
  })
  request.get('http://api.reimaginebanking.com/enterprise/transfers?key=373b787e00e0d2850be71e1331dea240', function(err,res,bod2) {
    var actualBody = JSON.parse(bod2);
    var transfers = actualBody.results;
    //console.log(transfers);
    var findMerchantGivenID = function(id) {
      return _.find(merchants, function(num) {
        return num._id == id;
      })

    }
    var transferData =[];
    for (var i = 0; i < transfers.length; i++) {
      transferData.push(Object.assign({},{date: transfers[i].transaction_date, id: transfers[i].payee_id, ammount: transfers[i].amount}));
    }

    //console.log(transfers);
    console.log('Merchant is here ' + findMerchantGivenID('5709deb8059d0946504a0e1d'));

    //var FinalTuple = [];
    /*
    for (var i = 0; i < transferData.length; i++) {
      var merchObj = findMerchantGivenID(transferData[i].id)

        if(transferData[i]){
          //FinalTuple.push(Object.assign({}, {date:transferData[i].date, ammount: transferData[i].amount, lat:merchObj.geocode.lat, long: merchObj.geocode.long, name: merchObj.name}));

    */


    }

  }
})
})
