angular_app.controller('JoinController', function ($scope, $location, userService, crowdService) {
  $scope.step = "asking_name";
  var name = "";
  var location = {
    latitude: 0.0,
    longitude: 0.0,
    accuracy: 0
  };

  $scope.setName = function () {
    // validate and return if incorrect
    if ($scope.newName === undefined || $scope.newName === "") {
      return;
    }
    name = $scope.newName;
    $scope.step = "getting_location"
    return true;    
  }

  $scope.getLocation = function () {
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
        "width='250' " +
        "height='300' " +
        "frameborder='0' style='border:0' " +
        "src='https://www.google.com/maps/embed/v1/place?key=AIzaSyCOnpZgn-7iSwcokSBUF8qM-BC2kbrC-v8" +
        "&q=" + location.latitude + "," + location.longitude + "'>" +
        "</iframe>";
      
      $('#current_location_map').html(location_template);
      $scope.$apply(function () {
        $scope.step = "displaying_map"
      });
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

    socket.on("userCreated", function (user) {
      userService.setUser(user);
    });

    socket.on("crowdAvailable", function (isCrowd) {
      if (isCrowd) {
        $scope.$apply(function () {
          $location.path('/found');
        });
      } else {
        $scope.$apply(function () {
          $location.path('/alone');
        });
      }

    });

    socket.emit("newUser", newUser);
    
  }



});