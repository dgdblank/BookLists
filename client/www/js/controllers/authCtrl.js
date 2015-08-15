angular.module('starter.auth', [])

.controller('AuthCtrl', function ($scope, Auth, $window, $location){

	$scope.user = {};

	$scope.signup = function(user){
		Auth.signup($scope.user)
			.then(function(data){
				$window.localStorage.setItem("jwtToken", data.token);
				$location.path("app/main");
			})
			.catch(function (error){
				console.log(error);
			});
	};

	$scope.signin = function(user){
		Auth.signin($scope.user)
			.then(function(data){
				$window.localStorage.setItem("jwtToken", data.token);
				$location.path("app/main");
			})
			.catch(function (error){
				console.log(error);
			});
	};
});