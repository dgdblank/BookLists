angular.module('starter.search', [])

.controller('SearchCtrl', function ($scope, Books){
  $scope.book = {};

  $scope.search = function(){
    Books.findBook($scope.book.title)
      .then(function (bookData){
        console.log(bookData);
          // Books.addBook(bookData);
      })
      .catch(function (error){
        throw new Error(error);
      })

    $scope.book.title = '';
  };

});