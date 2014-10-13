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
  
  // socket.on("newMessage", function (message) {
  //   $scope.$apply(function () {
  //     $scope.crowd = crowdService.getCrowd();
  //   });
  // });

});

