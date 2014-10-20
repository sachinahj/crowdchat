(function () {

  var initializeMap = function () {

    var center = new google.maps.LatLng(
      30.269693,
      -97.74252
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
