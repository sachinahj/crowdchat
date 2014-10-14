angular_app.controller('CrowdController', function ($scope, $location, userService, crowdService) {
  

  $scope.tab = 'messages';
  $scope.new_message = "";
  $scope.user = userService.getUser();
  $scope.crowd = crowdService.getCrowd();
  $scope.users = $scope.crowd.users;
  $scope.messages = $scope.crowd.messages;

  if ($scope.crowd.id === undefined || $scope.user.sid === undefined ) {
    $location.path('/alone');
  }
  
  $scope.sendMessage = function () {
    if ($scope.new_message === undefined || $scope.new_message === "") {
      return;
    }
    var message = {
      crowd_id: $scope.crowd.id,
      user_id: $scope.user.id,
      name: $scope.user.name,
      content: $scope.new_message
    };
    
    socket.emit("createNewMessage", message);
    $scope.new_message = "";
    return true;
  }

  socket.on("crowdUpdate", function (update_crowd) {
    $scope.$apply(function () {
      $scope.crowd = crowdService.getCrowd();
      $scope.users = $scope.crowd.users;
      $scope.messages = $scope.crowd.messages;
      if ($scope.tab === 'map') {
        $scope.mapInit();
      }
      if ($scope.crowd.id === undefined) {
        $location.path('/alone');
      }
    });
  });


  // $scope.mapInitialize = function () {
  $scope.mapInit = function() {
      $scope.tab = 'map';

      setTimeout(function () {
        // define map
        var center = new google.maps.LatLng(
          $scope.crowd.location.latitude,
          $scope.crowd.location.longitude
        );
        var mapOptions = {
          center: center,
          zoom: 14,
        };

        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

        // set user markers
        for (var i = 0; i < $scope.users.length; i++) {
          var markerCenter = new google.maps.LatLng(
            $scope.users[i].location.latitude,
            $scope.users[i].location.longitude
          );

          if ($scope.users[i].id === $scope.user.id) {
            console.log("$scope.users[i].id", $scope.users[i].id);
            console.log("$scope.user.id", $scope.user.id);
            var markerImage = {
              url: "images/person.png",
              scaledSize: new google.maps.Size(20, 20)
            };
          } else {
            var markerImage = {
              url: "images/person2.png",
              scaledSize: new google.maps.Size(20, 20)
            };
          }


          var markerObject = new google.maps.Marker({
            position: markerCenter,
            map: map,
            icon: markerImage
          });
        }

        // draw circle
        var crowdCircleOptions = {
          strokeColor: '#0080ff',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#0080ff',
          fillOpacity: 0.35,
          map: map,
          center: center,
          radius: 1000
        }; 
        var crowdCircle = new google.maps.Circle(crowdCircleOptions);
        

      }, 0);

      return true;

  }


});

