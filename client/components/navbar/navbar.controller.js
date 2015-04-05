'use strict';

angular.module('heatMapApp')
  .controller('NavbarCtrl', function ($scope, $location, $http) {
    $scope.logOutActive = ('/' === $location.path());

    $scope.logOut = function(){
        $http.post('/api/logout')
            .success(function(data){
                console.log('data: ', data.status);
                if(data.status) {
                    $location.path("/login");                    
                }
            });
    }
  });