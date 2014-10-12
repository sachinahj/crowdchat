angular_app.controller('CrowdController', function ($scope, $location, userService, crowdService) {
  
  $scope.user = userService.getUser();
  $scope.crowd = crowdService.getCrowd();

  socket.on("crowdUpdate", function (crowd) {
    $scope.crowd = crowd;
    crowdService.setCrowd(crowd);
  });
});