angular.module('starter.app', [])

.controller('AppCtrl', function ($scope, $state, $window) {

  // removes the user token and redirects the user to signin
    $scope.logout = function() {
      delete $window.localStorage.userId;
      delete $window.localStorage.jwtToken;
      $state.go('signin');
    };

})
