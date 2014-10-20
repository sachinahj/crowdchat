(function () {

  var initializeMap = function () {

    var center = new google.maps.LatLng(
      34.04710101277538,-118.24713066082154
    );

    var mapOptions = {
      center: center,
      zoom: 14
    };

    var map = new google.maps.Map(document.getElementById('crowd-surf-map-canvas'), mapOptions);

    return map;

  }

  window.google_map = initializeMap();


})();
