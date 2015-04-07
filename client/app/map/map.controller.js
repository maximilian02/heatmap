'use strict';

angular.module('heatMapApp')
  .controller('MapCtrl', function ($scope, $rootScope, $http, $location) {
  	$scope.currentPage = 1;
  	var map, pointarray, heatmap;

  	var taxiData = [];

	var initialize = function (first) {
	    var mapOptions = {
	      zoom: 3,
	      center: new google.maps.LatLng(first.lat, first.lon),
	      mapTypeId: google.maps.MapTypeId.SATELLITE
	    };

	    map = new google.maps.Map(document.getElementById('map-canvas'),
	        mapOptions);

	    var pointArray = new google.maps.MVCArray(taxiData);

	    heatmap = new google.maps.visualization.HeatmapLayer({
	      data: pointArray
	    });

	    heatmap.setMap(map);
	}

	var checkSession = function() {
		$http.get('/api/session')
	    	.success(function(data){
	    		console.log('data: ', data);
	    		if(!data.user_active) {
		          	$location.path("/login");
	    		} else {
	    			$scope.loadPage();
	    		}
	    	});
	}

	$scope.loadPage = function (loadPage) {
		$scope.currentPage = loadPage ? loadPage : 1;

		$http.get('/api/data', { params: { page: $scope.currentPage }})
	    	.success(function(data){
	    		var firstOne = {};
	    		$scope.totalPages = data.object.meta.pagination.pages;
	    		console.log('DATAAAA!: ', $scope.totalPages);

	    		for (var i = 0; i < data.object.visits.length; i++) {
	    			taxiData.push(new google.maps.LatLng(data.object.visits[i].latitude, data.object.visits[i].longitude));
	    			firstOne = i === 0 ? {lat: data.object.visits[i].latitude, lon: data.object.visits[i].longitude} : firstOne;
	    		};
	    		
	    		initialize(firstOne);
	    	});
	}

	$scope.getNumber = function(num) {
	    return new Array(num);   
	}

	checkSession();
  });
