angular.module('kargo')

	.controller('PostDetailsController', 
		['$scope', '$stateParams', 'PostsService', 'TrackerService',  
		 function ($scope, $stateParams, PostsService, TrackerService) {
		
			var getTrackerData = function () {
				TrackerService.getHits($scope.data.fromDate, $scope.data.toDate)
					.then(
						function (response) {

							$scope.data.trackers = response.data;
							$scope.trackerLoading = false;

						}, 
						function () {

						}
					);
			};

			$scope.data = {
				fromDatepickerOpened: false,
				fromDate: TrackerService.ISOStringToDate('2015-01-01'),
				toDate: TrackerService.ISOStringToDate('2015-02-01'),
				toDatepickerOpened: false,
				trackers: []
			};

			$scope.format = "yyyy-MM-dd";
			$scope.fromPickerIsOpen = false;
			$scope.postLoading = true;
			$scope.trackerLoading = true;

			$scope.open = function (source) {
				if(source === 'from'){ 
					$scope.data.fromDatepickerOpened = true;
				}else if(source === 'to'){
					$scope.data.toDatepickerOpened = true;
				}
				
			};

			$scope.$watch('data.fromDate', function (newVal, oldVal) {
				if(newVal === oldVal ){ 
					return; //handle initialization.
				}else{
					$scope.trackerLoading = true;
					getTrackerData();
				}
			});

			$scope.$watch('data.toDate', function (newVal, oldVal) {
				if(newVal === oldVal ){ 
					return; //handle initialization.
				}else{
					$scope.trackerLoading = true;
					getTrackerData();
				}
			});

			PostsService.get($stateParams.postId)
				.then(
					function (response) {

						$scope.post = response.data;
						$scope.postLoading = false;

					}, 
					function (error) {

					}
				);

			getTrackerData();

	}]);