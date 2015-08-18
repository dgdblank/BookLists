angular.module('starter.lists', [])

.controller('ListsCtrl', function ($scope, $window, Lists){

  $scope.$on('$ionicView.enter', function(e){

    $scope.newList = {};
    $scope.userId = $window.localStorage.userId;

    $scope.getLists = function(){
      console.log('getLists id', $scope.userId);
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
});