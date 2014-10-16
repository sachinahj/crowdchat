var angular_app = angular.module('angular_app', [ 'ngRoute' ]);

// routes
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
    .when('/found',
    {
      controller: 'FoundController',
      templateUrl: '../templates/found.html'
    })
    .otherwise( {redirectTo: '/home'} );
});

// directive to focus on text fields
angular_app.directive('focus', function ($timeout) {
  return {
    scope : {
      trigger : '@focus'
    },
    link : function(scope, element) {
      scope.$watch('trigger', function(value) {
        if (value === "true") {
          $timeout(function() {
            element[0].focus();
          });
        }
      });
    }
  };
}); 

// service to store User's info
angular_app.service('userService', function () {
  var user = {};

  this.setUser = function (new_user) {
    user = new_user;
  }

  this.getUser = function () {
    return user;
  }
});

// service to store User's Crowd's Info
angular_app.service('crowdService', function () {
  var crowd = {};

  this.setCrowd = function (new_crowd) {
    crowd = new_crowd;
  }
  
  this.getCrowd = function () {
    return crowd;
  }

  // update crowd on user add or delete
  socket.on("crowdUpdate", function (updated_crowd) {
    console.log("on crowdUpdate", updated_crowd);
    crowd = updated_crowd;
  });

});