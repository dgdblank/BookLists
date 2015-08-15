angular.module('starter.sevices', [])

.factory('Auth', function($http){
	var signup = function(user){
		return $http({
			method: "POST",
			url: "/users/signup",
			data: user
		})
		.then(function (resp){
			return resp.data;
		})
	}

	var signin = function(user){
		return $http({
			method: "POST",
			url: "/users/signup",
			data: user
		})
		.then(function (resp){
			return resp.data;
		});
	}

	return {
		signup: signup,
		signin: signin
	};
})