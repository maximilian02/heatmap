'use strict';

angular.module('heatMapApp')
  .controller('MapCtrl', function ($scope, $rootScope, $http, $location) {
	var checkSession = function() {
		$http.get('/api/data')
	    	.success(function(data){
	    		console.log('data: ', data);
	    		if(!data.user_active) {
		          	$location.path("/login");
	    		}
	    	});
	}

	checkSession();
  });
