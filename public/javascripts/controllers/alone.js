angular_app.controller('AloneController', function ($scope, $location, userService, crowdService) {
  
  $scope.user = userService.getUser();  

  socket.on("crowdUpdate", function (updated_crowd) {
    $scope.$apply(function () {
      $location.path('/crowd');
    });
  });

});