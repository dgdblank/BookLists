angular.module('starter.lists', [])

.controller('ListsCtrl', function ($scope, $rootScope, Lists){
  $scope.lists = [];
  $scope.newList = {};
  $scope.userId = $rootScope.currentUser;

  $scope.addlist = function(){
    Lists.addList($scope.newList, $scope.userId);
    $scope.newList.name = '';
    $scope.newList.type = '';
  };

});