angular.module('starter.lists', [])

.controller('ListsCtrl', function ($scope, $window, Lists){
  $scope.newList = {};
  $scope.userId = $window.localStorage.getItem('userId');


  $scope.getLists = function(){
    Lists.getLists($scope.userId)
      .then(function (lists){
        console.log(lists);
        $scope.lists = lists;
      });
  };

   $scope.addlist = function(){
    Lists.addList($scope.newList, $scope.userId);
    $scope.getLists();
    $scope.newList.name = '';
  };

  $scope.setListName = function(name){
    Lists.setName(name);
  };

  $scope.getLists();
});