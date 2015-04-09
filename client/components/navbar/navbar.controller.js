'use strict';

angular.module('heatMapApp')
  .controller('NavbarCtrl', function ($scope, $rootScope, $location, $http, $window) {
    $rootScope.logOutActive = ($location.path().indexOf('map') != -1);
    $scope.logOutActive = $rootScope.logOutActive;

    console.log("Path", $location.path());
    console.log("REGEX", $rootScope.logOutActive);
    console.log("algo; ", $scope.logOutActive);

    $scope.logOut = function() {
        $rootScope.logOutActive = false;
        $http.post('/api/logout')
            .success(function(data){
                console.log('CHECKOUT');
                $window.location.reload();
            });
    }

  });