angular_app.controller('HomeController', function ($scope, $location) {

  $scope.socket_connected = false;

  socket.emit('ping');
  socket.on('pong', function () {
    $scope.$apply(function () {
      $scope.socket_connected = true;  
    });
  });
});