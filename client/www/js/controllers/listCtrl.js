angular.module('starter.list', [])

.controller('ListCtrl', function ($scope, $stateParams, Books, Lists){
  $scope.books = [];
  $scope.listId = $stateParams.listId;

  $scope.$on('$ionicView.enter', function(e){
    if(!$scope.list){
      $scope.list = Lists.getName();
    }
  })
  console.log('scope.list', $scope.list);

  $scope.getBooks = function(){
    Books.getBooks($scope.listId)
      .then(function (data){
        $scope.books = data.books;
      });
  };

  $scope.getBooks();
});