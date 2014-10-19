(function () {

  var initializeMap = function () {

    var center = new google.maps.LatLng(
      30.267153,
      -97.7430608
    );

    var mapOptions = {
      center: center,
      zoom: 16
    };

    var map = new google.maps.Map(document.getElementById('crowd-surf-map-canvas'), mapOptions);

    return map;

  }

  window.google_map = initializeMap();


})();
