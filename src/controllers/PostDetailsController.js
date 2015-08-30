angular.module('kargo')

	.controller('PostDetailsController', 
		['$scope', '$stateParams', 'PostsService', 'TrackerService',  
		 function ($scope, $stateParams, PostsService, TrackerService) {
		
			$scope.data = {
				trackers: []
			};

			PostsService.get($stateParams.postId)
				.then(
					function (response) {

						$scope.post = response.data;

					}, 
					function (error) {

					}
				);

			TrackerService.getHits()
				.then(
					function (response) {

						$scope.data.trackers = response.data;
						
					}, 
					function () {

					}
				);

	}]);