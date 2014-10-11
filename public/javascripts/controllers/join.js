angular_app.controller('JoinController', function ($scope, $location) {
  $scope.step = "name";
  var name = "";
  $scope.status = "What is your name?"
  var location = {
    latitude: 0.0,
    longitude: 0.0,
    accuracy: 0
  };

  $scope.setNameAndGetLocation = function () {
    if ($scope.newName === undefined || $scope.newName === "") {
      return;
    }

    // set name
    name = $scope.newName;
    $scope.newName = "";

    // manipulate dom
    $scope.step = "getting";
    $scope.status = "Getting location....."

    // get users location
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(position) {
      var coordinates = position.coords;

      location.latitude = coordinates.latitude;
      location.longitude = coordinates.longitude;
      location.accuracy = coordinates.accuracy;

      var location_template =  "<iframe " +
        "width='300' " +
        "height='300' " +
        "frameborder='0' style='border:0' " +
        "src='https://www.google.com/maps/embed/v1/place?key=AIzaSyCOnpZgn-7iSwcokSBUF8qM-BC2kbrC-v8" +
        "&q=" + location.latitude + "," + location.longitude + "'>" +
        "</iframe>";
      
      $('#current_location_map').html(location_template);
      $scope.$apply(function () {
        $scope.status = "Is this your location?"
        $scope.step = "map"
      });
      // socket.emit('gotLocation', coordinates)
    };

    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  $scope.sendInformation = function () {
    var newUser = {
      name: name,
      latitude: location.latitude,
      longitude: location.longitude,
      accuracy: location.accuracy
    };
    socket.emit("newUser", newUser);
    $location.path('/');
    
  }



});