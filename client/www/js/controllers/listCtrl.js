angular.module('starter.list', [])

.controller('ListCtrl', function ($scope, $stateParams, Books, Lists){
  
  // Ionic's caching does not load the controller on state changes.
  // $scope listens for the view entry so it will load the controller methods.
  $scope.$on('$ionicView.enter', function(e){

    $scope.books = [];
    $scope.listId = $stateParams.listId;
    $scope.list = Lists.getName();

   // Gets the books attached to the list
    $scope.getBooks = function(){
      Books.getBooks($scope.listId)
        .then(function (data){
          $scope.books = data.books;
        });
    };

    $scope.getBooks();

  });

});