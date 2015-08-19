angular.module('starter.auth', [])

.controller('AuthCtrl', function ($scope, Auth, $rootScope, $window, $location){

	// form input object
	$scope.user = {};

	// Sends the user information to the server to add to the database and retrieve a token.
	// Attaches the token and user Id to localStorage
	$scope.signup = function(user){
		Auth.signup($scope.user)
			.then(function (data){
				$window.localStorage.setItem("jwtToken", data.token);
				$window.localStorage.setItem("userId", data.userId);
				// clear the form entry
				$scope.user.username = '';
				$scope.user.password = '';
				// redirects to main page
				$location.path('/app/lists');
			})
			.catch(function (error){
				console.log(error);
			});
	};


	// Checks the user information is in the database and sends up a token when confirmed.
	$scope.signin = function(user){
		Auth.signin($scope.user)
			.then(function (data){
				$window.localStorage.setItem("jwtToken", data.token);
				$window.localStorage.setItem("userId", data.userId);
				// clears form entry
				$scope.user.username = '';
				$scope.user.password = '';
				// redirects to main page
				$location.path('/app/lists');
			})
			.catch(function (error){
				console.log(error);
			});
	};
});