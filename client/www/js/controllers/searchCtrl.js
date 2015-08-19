angular.module('starter.search', [])

.controller('SearchCtrl', function ($scope, $window, Books, Lists){
  
  // Ionic's caching does not load the controller on state changes.
  // $scope listens for the view entry so it will load the controller methods.
  $scope.$on('$ionicView.enter', function(e){

    $scope.book = {};
    $scope.searchResults = [];
    $scope.selectedList = "Add to List:"; // Default selection for add to list
    $scope.userId = $window.localStorage.getItem('userId');

    // Searches for a book using the Google Books API
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


    // Gets the user's lists
    $scope.getLists = function(){
      Lists.getLists($scope.userId)
        .then(function (lists){
          $scope.lists = lists;
        })
    };

    // Adds the book to the list selected
    $scope.addToList = function(selectedList, selectedBook){
      for(var i = 0; i < $scope.lists.length; i++){
        if($scope.lists[i].name === selectedList){
          var id = $scope.lists[i].id;
        }
      }
      Books.addBook(id, selectedBook)
        .then(function (resp){
          if(resp){
            $scope.listAdded = true;
          }
        })
    }

    $scope.getLists();
  });
});