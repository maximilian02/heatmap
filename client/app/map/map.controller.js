'use strict';

angular.module('heatMapApp')
  .controller('MapCtrl', function ($scope, $rootScope, $http, $location, $routeParams) {
  	$scope.currentPage = 1;
  	$scope.showLoader = false;
  	var map, pointarray, heatmap;

  	var latLongData = [];

	var initialize = function (first) {
	    var mapOptions = {
	      zoom: 2,
	      center: new google.maps.LatLng(first.lat, first.lon),
	      mapTypeId: google.maps.MapTypeId.SATELLITE
	    };

	    map = new google.maps.Map(document.getElementById('map-canvas'),
	        mapOptions);

	    var pointArray = new google.maps.MVCArray(latLongData);

	    heatmap = new google.maps.visualization.HeatmapLayer({
	      data: pointArray
	    });

	    heatmap.setMap(map);
  		$scope.showLoader = false;
	}

	var checkSession = function() {
		$http.get('/api/session')
	    	.success(function(data){
	    		if(!data.user_active && $location.path().indexOf('login') == -1) {
		          	$location.path("/login");
	    		} else {
	    		console.log('data: ', data);
	    			$scope.loadPage();
	    		}
	    	});
	}

	$scope.loadPage = function (loadPage) {
		latLongData = [];
  		$scope.showLoader = true;
		console.log('loaded: ', loadPage);
		if($routeParams.pageId) {
			$scope.currentPage = $routeParams.pageId;
		} else {
			$scope.currentPage = loadPage ? loadPage : 1;
		}

		$location.path('map/' + $scope.currentPage + '/', false);

		$http.get('/api/data', { params: { page: $scope.currentPage }})
	    	.success(function(data){
	    		var firstOne = {};
	    		$scope.totalPages = data.object.meta.pagination.pages;
	    		console.log('DATAAAA!: ', $scope.totalPages);

	    		for (var i = 0; i < data.object.visits.length; i++) {
	    			latLongData.push(new google.maps.LatLng(data.object.visits[i].latitude, data.object.visits[i].longitude));
	    			firstOne = i === 0 ? {lat: data.object.visits[i].latitude, lon: data.object.visits[i].longitude} : firstOne;
	    		};
	    		
	    		initialize(firstOne);
	    	});
	}

	$scope.loadPrevPage = function () {
		if($scope.currentPage >= 2) {
			$scope.loadPage($scope.currentPage - 1);
		}
	}

	$scope.loadNextPage = function () {
		if($scope.currentPage < $scope.totalPages) {
			$scope.loadPage($scope.currentPage + 1);
		}
	}

	$scope.getNumber = function(num) {
	    return new Array(num);   
	}

	checkSession();
  });
