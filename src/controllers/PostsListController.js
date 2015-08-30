angular.module('kargo')

	.controller('PostsListController', ['PostsService', '$scope', '$state', function (PostsService, $scope, $state) {

		var postsList = this;

		PostsService.getAll().then(function (data) {

			postsList.data = data;

		});

		postsList.showDetails = function (postId) {

			$state.go('postDetail', { postId: postId });

		};

	}]);