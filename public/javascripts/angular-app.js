var angular_app = angular.module('angular_app', [ 'ngRoute' ]);

angular_app.config(function ($routeProvider) {
  $routeProvider
    .when('/home',
    {
      controller: 'HomeController',
      templateUrl: '../templates/home.html'
    })
    .when('/join',
    {
      controller: 'JoinController',
      templateUrl: '../templates/join.html'
    })
    .otherwise( {redirectTo: '/home'} );
});
