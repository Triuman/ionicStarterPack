// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'uiGmapgoogle-maps'])

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
    controller: 'AppCtrl'
  })


  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html'
      }
    }
  })
  .state('app.register', {
    url: '/register',
    views: {
      'menuContent': {
        templateUrl: 'templates/register.html'
      }
    }
  })
    .state('app.dashboard', {
      url: '/dashboard',
      views: {
        'menuContent': {
          templateUrl: 'templates/dashboard.html'
        }
      }
    })
  .state('app.location', {
      url: '/location',
      views: {
        'menuContent': {
          templateUrl: 'templates/location.html',
          controller: 'LocationCtrl'
        }
      }
    })
    .state('app.contacts', {
      url: '/contacts',
      views: {
        'menuContent': {
          templateUrl: 'templates/contacts.html',
          controller: 'ContactsCtrl'
        }
      }
    })

  .state('app.datePicker', {
    url: '/datePicker',
    views: {
      'menuContent': {
        templateUrl: 'templates/datePicker.html',
        controller: 'DatePickerCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
