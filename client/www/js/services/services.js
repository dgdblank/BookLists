angular.module('starter.services', [])

.factory('Auth', function ($http){

	var signup = function (user){
		return $http({
			method: "POST",
			url: "/users/signup",
			data: user
		})
		.then(function (resp){
			return resp.data;
		});
	};

	var signin = function (user){
		return $http({
			method: "POST",
			url: "/users/signin",
			data: user
		})
		.then(function (resp){
			return resp.data;
		});
	};

	return {
		signup: signup,
		signin: signin
	};
})

.factory('Lists', function ($http){

	var addList = function(list, id){
		return $http({
			method: "POST",
			url: "/users/" + id + "/addList",
			data: JSON.stringify(list)
		});
	};

	var getLists = function(id){
		return $http({
			method: "GET",
			url: "/users/" + id + "/getLists"
		})
		.then(function (resp){
			return resp.data;
		})
	}

	var listName = '';
	var setName = function(name){
		listName = name;
	};

	var getName = function(){
		return listName;
	};

	return {
		addList: addList,
		getLists: getLists,
		setName: setName,
		getName: getName
	};
})

.factory('Books', function ($http){

	var findBook = function(title){
		title = title.split(' ').join('+');
		var bookUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + title + '&fields=items(volumeInfo/title,volumeInfo/authors,volumeInfo/pageCount,volumeInfo/imageLinks/thumbnail,volumeInfo/categories)';
		return $http({
			method: "GET",
			url: bookUrl
		})
		.then(function (resp){
			return resp;
		})
	};

	var addBook = function(listId, book){
		return $http({
			method: "POST",
			url: "/lists/" + listId + "/addBook",
			data: book
		})
		.then(function (resp){
			return resp;
		});
	};

	var getBooks = function(listId){
		return $http({
			method: "GET",
			url: "/lists/" + listId + "/getBooks"
		})
		.then(function (resp){
			return resp.data;
		})
	}

	return {
		findBook: findBook,
		addBook: addBook,
		getBooks: getBooks
	};

});
