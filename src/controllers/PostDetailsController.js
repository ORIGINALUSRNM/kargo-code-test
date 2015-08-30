angular.module('kargo')
	.controller('PostDetailsController', ['$scope', '$stateParams', 'PostsService', function ($scope, $stateParams, PostsService) {
		PostsService.get($stateParams.postId)
			.then(
				function (response) {
					$scope.post = response.data;
				}, 
				function (error) {

				}
			);
	}]);