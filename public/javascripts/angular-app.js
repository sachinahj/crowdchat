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


angular_app.service('userService', function () {
  var user = {};
  user = JSON.parse('{"name":"sdfs","sid":"hugn6ox8YxfqD2WNAAAL","location":{"latitude":30.267136699999995,"longitude":-97.749625,"accuracy":45}}');

  this.setUser = function (new_user) {
    user = new_user;
  }

  this.getUser = function () {
    return user;
  }
});


angular_app.service('crowdService', function () {
  var crowd = {};
  crowd = JSON.parse('{"id":1,"location":{"latitude":30.26713205000057,"longitude":-97.74961274999943},"users":[{"name":"safhin","sid":"tCDBCRfvFcy66PQsAAAJ","location":{"latitude":30.2671274,"longitude":-97.7496005,"accuracy":47}},{"name":"sdfs","sid":"hugn6ox8YxfqD2WNAAAL","location":{"latitude":30.267136699999995,"longitude":-97.749625,"accuracy":45}},{"name":"sdfs","sid":"hugn6ox8YxfqD2WNAAAL","location":{"latitude":30.267136699999995,"longitude":-97.749625,"accuracy":45}},{"name":"sdfs","sid":"hugn6ox8YxfqD2WNAAAL","location":{"latitude":30.267136699999995,"longitude":-97.749625,"accuracy":45}},{"name":"sdfs","sid":"hugn6ox8YxfqD2WNAAAL","location":{"latitude":30.267136699999995,"longitude":-97.749625,"accuracy":45}},{"name":"sdfs","sid":"hugn6ox8YxfqD2WNAAAL","location":{"latitude":30.267136699999995,"longitude":-97.749625,"accuracy":45}},{"name":"sdfs","sid":"hugn6ox8YxfqD2WNAAAL","location":{"latitude":30.267136699999995,"longitude":-97.749625,"accuracy":45}},{"name":"sdfs","sid":"hugn6ox8YxfqD2WNAAAL","location":{"latitude":30.267136699999995,"longitude":-97.749625,"accuracy":45}},{"name":"sdfs","sid":"hugn6ox8YxfqD2WNAAAL","location":{"latitude":30.267136699999995,"longitude":-97.749625,"accuracy":45}}],"messages":[]}');

  this.setCrowd = function (new_crowd) {
    crowd = new_crowd;
  }
  
  this.getCrowd = function () {
    return crowd;
  }

  socket.on("crowdUpdate", function (updated_crowd) {
    console.log("on crowdUpdate", updated_crowd);
    crowd = updated_crowd;
  });

});