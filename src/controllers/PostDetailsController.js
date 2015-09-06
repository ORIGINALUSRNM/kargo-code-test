angular.module('kargo')

	.controller('PostDetailsController', 
		['$scope', '$stateParams', 'PostsService', 'TrackerService',  
		 function ($scope, $stateParams, PostsService, TrackerService) {
		
			$scope.data = {
				fromDate: '2015-01-01',
				toDate: '2015-03-01',
				trackers: []
			};

			$scope.postLoading = true;
			$scope.trackerLoading = true;


			PostsService.get($stateParams.postId)
				.then(
					function (response) {

						$scope.post = response.data;
						$scope.postLoading = false;

					}, 
					function (error) {

					}
				);

			TrackerService.getHits($scope.data.fromDate, $scope.data.toDate)
				.then(
					function (response) {

						$scope.data.trackers = response.data;
						$scope.trackerLoading = false;

					}, 
					function () {

					}
				);

	}]);