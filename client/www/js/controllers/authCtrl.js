angular.module('starter.auth', [])

.controller('AuthCtrl', function ($scope, Auth, $rootScope, $window, $state){

	$scope.user = {};

	$scope.signup = function(user){
		Auth.signup($scope.user)
			.then(function (data){
				$window.localStorage.setItem("jwtToken", data.token);
				$window.localStorage.setItem("userId", data.userId);
				$scope.user.username = '';
				$scope.user.password = '';
				$state.go('app.lists');
			})
			.catch(function (error){
				console.log(error);
			});
	};

	$scope.signin = function(user){
		Auth.signin($scope.user)
			.then(function (data){
				console.log(data);
				$window.localStorage.setItem("jwtToken", data.token);
				$window.localStorage.setItem("userId", data.userId);
				$scope.user.username = '';
				$scope.user.password = '';
				$state.go('app.lists');
			})
			.catch(function (error){
				console.log(error);
			});
	};
});