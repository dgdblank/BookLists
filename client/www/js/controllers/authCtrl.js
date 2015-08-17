angular.module('starter.auth', [])

.controller('AuthCtrl', function ($scope, Auth, $window, $state){

	$scope.user = {};

	$scope.signup = function(user){
		console.log('controller called');
		console.log($scope.user);
		Auth.signup($scope.user)
			.then(function (data){
				$window.localStorage.setItem("jwtToken", data.token);
				$state.go('app.playlists');
			})
			.catch(function (error){
				console.log(error);
			});
	};

	$scope.signin = function(user){
		Auth.signin($scope.user)
			.then(function (data){
				$window.localStorage.setItem("jwtToken", data.token);
				$state.go('app.playlists');
			})
			.catch(function (error){
				console.log(error);
			});
	};
});