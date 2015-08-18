angular.module('starter.list', [])

.controller('ListCtrl', function ($scope, $stateParams, Books, Lists){
  
  $scope.$on('$ionicView.enter', function(e){
    $scope.books = [];
    $scope.listId = $stateParams.listId;
    $scope.list = Lists.getName();
    console.log('scope.list', $scope.list);

    $scope.getBooks = function(){
      Books.getBooks($scope.listId)
        .then(function (data){
          $scope.books = data.books;
        });
    };

    $scope.getBooks();

  });

});