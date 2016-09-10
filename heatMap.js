var mymap = L.map('mapid').setView([37.34505086, -121.93416595], 13);

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

    var heat = L.heatLayer([
    [37.34505086, -121.93416595, 5],
    [37.34505086, -121.93416595, 10]
    ], {radius: 25}).addTo(mymap);
    $.ajax({
      url: "http://localhost:3000/gatherData"
    }).done(function(res) {
      console.log(res);
    });
