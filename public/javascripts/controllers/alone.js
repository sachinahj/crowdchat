angular_app.controller('AloneController', function ($scope, $location, userService, crowdService) {
  
  $scope.user = userService.getUser();  

  socket.on("crowdUpdate", function (crowd) {
    crowdService.setCrowd(crowd);
    $scope.$apply(function () {
      $location.path('/crowd');
    });
  });

});