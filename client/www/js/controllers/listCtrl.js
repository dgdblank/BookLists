angular.module('starter.list', [])

.controller('ListCtrl', function ($scope, $stateParams, Books){
  $scope.books = [];
  $scope.listId = $stateParams.listId;

  $scope.getBooks = function(){
    Books.getBooks($scope.listId)
      .then(function (data){
        $scope.list = data.list;
        $scope.books = data.books;
      });
  };

  $scope.getBooks();
});