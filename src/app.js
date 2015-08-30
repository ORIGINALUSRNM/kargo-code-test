angular.module('kargo', ['ui.router'])

	.constant('POSTS_URL', 'http://jsonplaceholder.typicode.com/posts')

	.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {

		////////////////
		//set up HTML5 mode in order to use push state for modern browsers so users do not have to see
		//unsightly hashes.
		///////////////
		//$locationProvider.html5Mode(true);

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('postsList', {
				url: '/',
				//controller: 'PostsListController',
				//controllerAs: 'postsList',
				template: '<posts-list></posts-list>'
				//templateUrl: 'partials/posts-list.html'
			})
			.state('postDetail', {
				url: '/:postId',
				controller: function ($scope, $stateParams) {
					$scope.id = $stateParams.postId;
				},
				templateUrl: 'partials/post-details.html'
			});
	});