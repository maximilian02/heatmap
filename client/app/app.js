'use strict';

angular.module('heatMapApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
          templateUrl: 'app/map/map.html',
          controller: 'MapCtrl'
      })
      .when('/login', {
          templateUrl: 'app/login/login.html',
          controller: 'LoginCtrl'
      })
      .when('/404', {
          templateUrl: 'app/404/404.html'
      })
      .otherwise({
        redirectTo: '/404'
      });

    $locationProvider.html5Mode(true);
  });