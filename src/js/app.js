var angular = require('angular'),
  ngRoute = require('angular-route'),
  Firebase = require('firebase'),
  angularfire = require('angularfire'),
  SimpleLogin = require('firebase-simple-login'),
  waitForAuth = require('./modules/waitForAuth');

require('./services/firebase');
require('./modules/routeSecurity');
require('./services/login');

var module = angular.module('myApp', [
  'ngRoute',
  'firebase',
  'myApp.config',
  'myApp.service.firebase',
  'myApp.service.login',
  'waitForAuth',
  'routeSecurity'
]);
require('./config');

module.controller('HomeCtrl', require('./controllers/homeController.js'));
module.controller('ChatCtrl', require('./controllers/chatController.js'));
module.controller('LoginCtrl', require('./controllers/loginController.js'));
module.controller('AccountCtrl', require('./controllers/accountController.js'));

module.filter('interpolate', require('./filters/interpolate.js'));
module.filter('reverse', require('./filters/reverse.js'));

module.directive('appVersion', require('./directives/appversion'));


module.run(function (loginService, $rootScope, FBURL) {
  if (FBURL === 'https://INSTANCE.firebaseio.com') {
    // double-check that the app has been configured
    angular.element(document.body).html('<h1>Please configure src/js/config.js before running!</h1>');
    setTimeout(function () {
      angular.element(document.body).removeClass('hide');
    }, 250);
  }
  else {
    // establish authentication
    $rootScope.auth = loginService.init('/login');
    $rootScope.FBURL = FBURL;
  }
});

module.config(function ($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'partials/home.html',
    controller: 'HomeCtrl'
  });
  $routeProvider.when('/chat', {
    templateUrl: 'partials/chat.html',
    controller: 'ChatCtrl'
  });
  $routeProvider.when('/account', {
    authRequired: true, // must authenticate before viewing this page
    templateUrl: 'partials/account.html',
    controller: 'AccountCtrl'
  });
  $routeProvider.when('/login', {
    templateUrl: 'partials/login.html',
    controller: 'LoginCtrl'
  });
  $routeProvider.otherwise({redirectTo: '/home'});
});
