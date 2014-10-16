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
  user = JSON.parse('{"name":"sachin","sid":"hugn6ox8YxfqD2WNAAAL","location":{"latitude":30.267136699999995,"longitude":-97.749625,"accuracy":45}}');

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
  // crowd = JSON.parse('{"id":1,"location":{"latitude":30.26713205000057,"longitude":-97.74961274999943},"users":[{"name":"safhin","sid":"tCDBCRfvFcy66PQsAAAJ","location":{"latitude":30.2671274,"longitude":-97.7496005,"accuracy":47}},{"name":"sdfs","sid":"hugn6ox8YxfqD2WNAAAL","location":{"latitude":30.267136699999995,"longitude":-97.749625,"accuracy":45}},{"name":"sdfs","sid":"hugn6ox8YxfqD2WNAAAL","location":{"latitude":30.267136699999995,"longitude":-97.749625,"accuracy":45}},{"name":"sdfs","sid":"hugn6ox8YxfqD2WNAAAL","location":{"latitude":30.267136699999995,"longitude":-97.749625,"accuracy":45}},{"name":"sdfs","sid":"hugn6ox8YxfqD2WNAAAL","location":{"latitude":30.267136699999995,"longitude":-97.749625,"accuracy":45}},{"name":"sdfs","sid":"hugn6ox8YxfqD2WNAAAL","location":{"latitude":30.267136699999995,"longitude":-97.749625,"accuracy":45}},{"name":"sdfs","sid":"hugn6ox8YxfqD2WNAAAL","location":{"latitude":30.267136699999995,"longitude":-97.749625,"accuracy":45}},{"name":"sdfs","sid":"hugn6ox8YxfqD2WNAAAL","location":{"latitude":30.267136699999995,"longitude":-97.749625,"accuracy":45}},{"name":"sdfs","sid":"hugn6ox8YxfqD2WNAAAL","location":{"latitude":30.267136699999995,"longitude":-97.749625,"accuracy":45}}],"messages":[]}');
  crowd = JSON.parse('{"id":1,"location":{"latitude":30.277237376927136,"longitude":-97.72043552668873},"users":[{"id":1,"name":"sachin","sid":"LaLyHILYvhhLePfjAAAC","location":{"latitude":30.278382699999998,"longitude":-97.72114769999999,"accuracy":58},"$$hashKey":"0EQ"},{"id":3,"name":"bob","sid":"iqdm0yhseFyx2rWhAAAG","location":{"latitude":30.278400499999996,"longitude":-97.7211787,"accuracy":35},"$$hashKey":"0ER"},{"id":4,"name":"big sean","sid":"rV2RO-0byVWorTWlAAAH","location":{"latitude":30.278400499999996,"longitude":-97.7211787,"accuracy":35},"$$hashKey":"0ES"},{"id":5,"name":"kobe","sid":"ObJQzY5kL4yutjqLAAAI","location":{"latitude":30.2784184,"longitude":-97.72125419999999,"accuracy":51},"$$hashKey":"0ET"}],"messages":[{"id":0,"user_id":1,"name":"sachin","content":"hey whats up","$$hashKey":"0EY"},{"id":1,"user_id":3,"name":"bob","content":"not much dood just chillin","$$hashKey":"0EZ"},{"id":2,"user_id":4,"name":"big sean","content":"this app is awesome!","$$hashKey":"0F0"},{"id":3,"user_id":5,"name":"kobe","content":"i know","$$hashKey":"0F1"},{"id":4,"user_id":5,"name":"kobe","content":"did yall see this","$$hashKey":"0F2"},{"id":5,"user_id":5,"name":"kobe","content":"and that","$$hashKey":"0F3"},{"id":6,"user_id":5,"name":"kobe","content":"and blah","$$hashKey":"0F4"},{"id":7,"user_id":5,"name":"kobe","content":"and blahh blahhh","$$hashKey":"0F5"},{"id":8,"user_id":5,"name":"kobe","content":"and u know i","$$hashKey":"0F6"},{"id":9,"user_id":5,"name":"kobe","content":"and i do this","$$hashKey":"0F7"},{"id":10,"user_id":3,"name":"bob","content":"god kobe shut u","$$hashKey":"0F8"},{"id":11,"user_id":1,"name":"sachin","content":"yea man","$$hashKey":"0F9"},{"id":12,"user_id":5,"name":"kobe","content":"nah yall shut up","$$hashKey":"0FA"},{"id":13,"user_id":4,"name":"big sean","content":"got em","$$hashKey":"0FB"},{"id":14,"user_id":1,"name":"sachin","content":"staaahhhhp","$$hashKey":"0FC"},{"id":15,"user_id":3,"name":"bob","content":"haha got jokes","$$hashKey":"0FD"},{"id":16,"user_id":5,"name":"kobe","content":"i pee my pants","$$hashKey":"0FE"},{"id":17,"user_id":4,"name":"big sean","content":"yea all the time","$$hashKey":"0FF"},{"id":18,"user_id":1,"name":"sachin","content":"i hate sleeping over at ur place","$$hashKey":"0FG"},{"id":19,"user_id":3,"name":"bob","content":"yeah it sucks","$$hashKey":"0FH"}]}');

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