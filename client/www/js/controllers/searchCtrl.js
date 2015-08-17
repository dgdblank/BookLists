angular.module('starter.search', [])

.controller('SearchCtrl', function ($scope, Books){
  $scope.book = {};
  $scope.searchResults = [];

  $scope.search = function(){
    Books.findBook($scope.book.title)
      .then(function (books){
        debugger;
        $scope.searchResults = books.data.items;
      })
      .catch(function (error){
        throw new Error(error);
      })

    $scope.book.title = '';
  };



});