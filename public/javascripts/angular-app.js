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
    .when('/crowd',
    {
      controller: 'CrowdController',
      templateUrl: '../templates/crowd.html'
    })
    .when('/alone',
    {
      controller: 'AloneController',
      templateUrl: '../templates/alone.html'
    })
    .otherwise( {redirectTo: '/home'} );
});


angular_app.service('userService', function () {
  var user = {};

  this.setUser = function (new_user) {
    user = new_user;
  }

  this.getUser = function () {
    return user;
  }
});


angular_app.service('crowdService', function () {
  var crowd = {};

  this.setCrowd = function (new_crowd) {
    crowd = new_crowd;
  }
  
  this.getCrowd = function () {
    return crowd;
  }

});