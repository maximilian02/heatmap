'use strict';

angular.module('heatMapApp')
  .controller('LoginCtrl', function ($scope, $rootScope, $http, $location) {
    $scope.apiData = [];
    $scope.credentials = {username: '', password: ''};
    $scope.error = false;

    var authenticate = function(credentials, callback) {
	    var credentialsObj = {
	    	// "username" : "stampy@example.com",
		    // "password" : "#PR4fS[N&-c,Ns3&"
		    "username" : credentials.username,
		    "password" : credentials.password
		}

		$http.post('/api/login', credentialsObj)
			.success(function(data) {
				if (200 === data.statusCode) {
					console.log('response', data.statusCode);
			        $rootScope.authenticated = true;
			    } else {
					$rootScope.authenticated = false;
			    }
		      	callback && callback();
		    })
		    .error(function() {
	      		$rootScope.authenticated = false;
	      		callback && callback();
	    	});
	}

	$scope.login = function() {
		authenticate(
			$scope.credentials, 
			function() {
				console.log('callback!!!!!!');
		        if ($rootScope.authenticated) {
		          	$scope.error = false;
		          	$location.path("/");
		        } else {
		          	$scope.credentials.username = $scope.credentials.password = '';
		          	$scope.error = true;
		        }
		    }
		);
	};

	var checkSession = function() {
		$http.get('/api/session')
	    	.success(function(data){
	    		console.log('data: ', data);
	    		if(data.user_active) {
		          	$location.path("/");
	    		}
	    	});
	}

	checkSession();
  });
