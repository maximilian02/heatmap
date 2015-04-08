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
      .when('/map', {
          templateUrl: 'app/map/map.html',
          controller: 'MapCtrl'
      })
      .when('/map/:pageId/', {
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
  })
  .run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
            });
        }
        return original.apply($location, [path]);
    };
}]);