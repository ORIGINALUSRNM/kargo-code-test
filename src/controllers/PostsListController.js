angular.module('kargo')

	.controller('PostsListController', ['PostsService', '$scope', '$state', function (PostsService, $scope, $state) {

		var postsList = this;

		postsList.posts = PostsService.getPosts();

		postsList.showDetails = function (postId) {

			$state.go('postDetail', { postId: postId });

		};

	}]);