angular.module('starter.lists', [])

.controller('ListsCtrl', function ($scope, $rootScope, Lists){
  $scope.newList = {};
  $scope.userId = $rootScope.currentUser;


  $scope.getLists = function(){
    Lists.getLists($scope.userId)
      .then(function (lists){
        $scope.lists = lists;
      });
  };

   $scope.addlist = function(){
    Lists.addList($scope.newList, $scope.userId);
    $scope.getLists();
    $scope.newList.name = '';
    $scope.newList.type = '';
  };

  $scope.getLists();
});