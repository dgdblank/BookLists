angular.module('starter.lists', [])

.controller('ListsCtrl', function ($scope, $window, Lists){

  // Ionic's caching does not load the controller on state changes.
  // $scope listens for the view entry so it will load the controller methods.
  $scope.$on('$ionicView.enter', function(e){

    $scope.newList = {};
    $scope.userId = $window.localStorage.userId;

    // Gets the user's lists
    $scope.getLists = function(){
      Lists.getLists($scope.userId)
        .then(function (lists){
          $scope.lists = lists;
        });
    };

    // Adds a new list for the user
    $scope.addlist = function(){
      Lists.addList($scope.newList, $scope.userId);
      $scope.getLists();
      $scope.newList.name = '';
    };

    // Sets the selected list name
    $scope.setListName = function(name){
      Lists.setName(name);
    };

    $scope.getLists();
  });
  
});