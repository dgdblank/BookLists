// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', 
  ['ionic', 
  'starter.app',
  'starter.auth',
  'starter.services'
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
    access: {login: false} // applies to all children of app
  })

  .state('signin', {
    url: '/signin',
    templateUrl: 'templates/signin.html',
    controller: 'AuthCtrl',
    access: {login: false}
  })

  .state('signup', {
    url: '/signup',
    templateUrl: "templates/signup.html",
    controller: "AuthCtrl",
    access: {login: false}
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/signin');
})

.factory("AttachTokens", function ($window){
  // this is an $httpInteceptor
  // It stops out going requests then looks in local storage to find the user's token
  // then adds it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem("com.starter");
      if (jwt) {
        object.headers["x-access-token"] = jwt;
      }
      object.headers["Allow-Control-Allow-Origin"] = "*";
      return objectl
    }
  };
  return attach;
})

// .run(function ($rootScope, $location, $window, authenticationService){
  
//   $rootScope.$on("$stateChangeStart", function (event, toState){
//     var requireLogin = toState.access.login;
//     if(requireLogin && !authenticationService.isLogged){
//       $location.path("/signin");
//     }
//   });

// })
