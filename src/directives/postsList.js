angular.module('kargo')
	.directive('postsList', function () {
		return {
			restrict: 'EA',
			replace: true,
			controller: 'PostsListController',
			controllerAs: 'postsList',
			templateUrl: 'partials/posts-list.html',
			scope: {}//creates isolate scope, completely encapsulating directive
		};
	});