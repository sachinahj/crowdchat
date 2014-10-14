angular_app.controller('FoundController', function ($scope, $location, userService, crowdService) {
  
  $scope.crowd = crowdService.getCrowd();

  if ($scope.crowd.id === undefined) {
    $location.path('/home');
  }

  setTimeout(function () {
    $scope.$apply(function () {
      $location.path('/crowd');
    });
  }, 3000);


  $scope.clearInfo = function () {
    userService.setUser({});
    crowdService.setCrowd({});
    window.location.href = "/";
  }

});