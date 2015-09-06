angular.module('kargo')
	.controller('PostsListController', ['PostsService', '$scope', '$state', function (PostsService, $scope, $state) {

		var postsList = this;

		postsList.loading = true;
	
		PostsService.getAll().then(
			function (data) {
				postsList.data = data;
				postsList.loading = false;
			},
			function (error) {
				
			}
		);

		//this navigation is coupled with the directive and should really be moved out
		//into a separate navigation handler that handles it for the whole app.
		postsList.showDetails = function (postId) {
			$state.go('postDetail', { postId: postId });
		};
	}]);