var mymap = L.map('mapid').setView([37.34505086, -121.93416595], 13.5);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);

    var popup = L.popup();

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(mymap);
    }

    mymap.on('click', onMapClick);
    mymap.scrollWheelZoom.disable();

    /*var heat = L.heatLayer([
    [37.34505086, -121.93416595, 5],
    [37.34505086, -121.93416595, 10]
  ], {radius: 25}).addTo(mymap); */

  $("#sanjose").click(function() {
    mymap.setView([37.34505086, -121.93416595], 13.5)
  })

  $("#newyork").click(function() {
    mymap.setView([40.73122637, -73.99525881], 15.3)
  })

  $("#sanfrancisco").click(function() {
    mymap.setView([37.78769136, -122.40731835], 13.5)
  })

    $.ajax({
      url: "https://murmuring-journey-35969.herokuapp.com/SanJoseData"
    }).done(function(res) {
      console.log(res);
      var coor = [];
      for (var i = 0; i < res.length; i++) {
        coor.push([res[i].Latitude, res[i].Longitutde, res[i].Amount/12000]);
      }
      var heat = L.heatLayer(coor, {radius: 35}).addTo(mymap);
    });
