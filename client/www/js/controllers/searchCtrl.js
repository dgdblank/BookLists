angular.module('starter.search', [])

.controller('SearchCtrl', function ($scope, $window, Books, Lists){
  
  $scope.$on('$ionicView.enter', function(e){

    $scope.book = {};
    $scope.searchResults = [];
    $scope.selectedList = "Add to List";
    $scope.userId = $window.localStorage.getItem('userId');

    $scope.search = function(){
      Books.findBook($scope.book.title)
        .then(function (books){
          $scope.searchResults = books.data.items;
        })
        .catch(function (error){
          throw new Error(error);
        })

      $scope.book.title = '';
    };


    $scope.getLists = function(){
      Lists.getLists($scope.userId)
        .then(function (lists){
          console.log(lists);
          $scope.lists = lists;
        })
    };

    $scope.addToList = function(selectedList, selectedBook){
      for(var i = 0; i < $scope.lists.length; i++){
        if($scope.lists[i].name === selectedList){
          var id = $scope.lists[i].id;
        }
      }
      Books.addBook(id, selectedBook);
      // TO DO, show success
      // console.log('list', selectedList);
      // console.log('book', selectedBook);
    }

    $scope.getLists();

  })
});