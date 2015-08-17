angular.module('starter.services', [])

.factory('Auth', function ($http){

	var signup = function (user){
		console.log('services reached', user);
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
		console.log('signin services reached', user);
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
		console.log('list', list);
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

	return {
		addList: addList,
		getLists: getLists
	};
})

// .factory('authenticationService', function ($window){
// 	var auth = {
// 		isLogged: false
// 	};

// 	try {
// 		if ($window.localStorage.getItem("jwtToken")){
// 			auth.isLogged = true;
// 		}
// 	} catch (e) {};

// 	return auth;
// })