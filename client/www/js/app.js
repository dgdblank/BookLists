// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', 
  ['ionic', 
  'starter.app',
  'starter.auth',
  'starter.lists',
  'starter.list',
  'starter.search',
  'starter.services',
  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl',
    access: {
      login: true
    } 
  })

  .state('signin', {
    url: '/signin',
    templateUrl: 'templates/signin.html',
    controller: 'AuthCtrl',
    access: {
      login: false
    }
  })

  .state('signup', {
    url: '/signup',
    templateUrl: "templates/signup.html",
    controller: "AuthCtrl",
    access: {
      login: false
    }
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: "SearchCtrl"
      }
    },
    access: {
      login: true
    }
  })

  .state('app.lists', {
    url: '/lists',
    views: {
      'menuContent': {
        templateUrl: 'templates/lists.html',
        controller: 'ListsCtrl'
      }
    },
    access: {
      login: true
    }
  })

  .state('app.list', {
    url: '/lists/:listId',
    views: {
      'menuContent': {
        templateUrl: 'templates/list.html',
        controller: 'ListCtrl'
      }
    },
    access: {
      login: true
    }
  })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/lists');
})

.run(function ($rootScope, $window, $state){


  $rootScope.$on("$stateChangeStart", function (event, toState){
    var requireAccess = toState.access.login;

    // Checks if the user is logged in and if the page requires 
    // the user to be logged in. 
    // Redirects to login if not.
    if(!$window.localStorage.jwtToken && requireAccess){
      event.preventDefault();
      console.log('requires login');
      $state.go('signin');
    }
  });
});

