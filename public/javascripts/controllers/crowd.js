angular_app.controller('CrowdController', function ($scope, $location, userService, crowdService) {
  

  $scope.tab = 'messages';
  $scope.new_message = "";
  $scope.user = userService.getUser();
  $scope.crowd = crowdService.getCrowd();
  $scope.users = $scope.crowd.users;
  $scope.messages = $scope.crowd.messages;

  if ($scope.crowd.id === undefined || $scope.user.sid === undefined ) {
    $location.path('/home');
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
      if ($scope.crowd.id === undefined) {
        $location.path('/');
      }
    });
  });


  // $scope.mapInitialize = function () {
  $scope.mapInit = function() {
      $scope.tab = 'map';

      
      console.log("running mapInit");
      console.log(document.getElementById('map-canvas'));

      setTimeout(function () {

        var center = new google.maps.LatLng(30.2709151,-97.7449491);
        var mapOptions = {
          center: center,
          zoom: 14,
        };

        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);


        var markerLatLng = new google.maps.LatLng(30.2709151,-97.7449491);
        var image = {
          url: "images/person2.png",
          scaledSize: new google.maps.Size(20, 20)
        };
        var marker = new google.maps.Marker({
            position: markerLatLng,
            map: map,
            title:"Hello World!",
            icon: image,
        });

        var markerLatLng2 = new google.maps.LatLng(30.2709151,-97.744);
        var image2 = {
          url: "images/person2.png",
          scaledSize: new google.maps.Size(20, 20)
        };
        var marker2 = new google.maps.Marker({
            position: markerLatLng2,
            map: map,
            title:"Hello World!",
            icon: image2,
        });

        var circleOptions = {
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map: map,
          center: center,
          radius: 1000
        }; 
        var cityCircle = new google.maps.Circle(circleOptions);

        
        return true;

      }, 0);


  }

    // var response = google.maps.event.addDomListener(window, 'load', mapInit);
    // console.log("response", response);
  // }

});

