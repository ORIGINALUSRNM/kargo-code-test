angular.module('kargo', ['ui.router'])

	.constant('POSTS_URL', 'http://jsonplaceholder.typicode.com/posts')

	.constant('TRACKER_URL', 'http://kargotest.herokuapp.com/api/trackers?from={{fromDate}}&to={{toDate}}')

	.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('postsList', {
				url: '/',
				template: '<posts-list></posts-list>'
			})
			.state('postDetail', {
				url: '/:postId',
				controller: 'PostDetailsController',
				templateUrl: 'partials/post-details.html'
			});
	});