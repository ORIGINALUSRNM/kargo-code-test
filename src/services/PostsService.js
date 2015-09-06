angular.module('kargo')

	.factory('PostsService', ['$http', '$q', 'POSTS_URL', function ($http, $q, POSTS_URL) {

		var data = {
			posts: []
		};

		var get = function (postId) {
			///////////
			//not caching individual posts because want user to always have most updated data.
			//if posts could never be edited or deleted, then caching would make sense here ( not sure 
			//if posts can be edited or delted )
			///////////
			var postDetail = $q.defer();

			$http.get(POSTS_URL + '/' + postId)
				.then(
					function (response) {
						postDetail.resolve(response);
					},
					function (response) {
						postDetail.reject(response);
					}
				);
			return postDetail.promise;
		};

		var getAll = function () {
			var posts = $q.defer();
			///////////
			//jsonplaceholder api set to allow all origins so no cross origin issues.
			///////////
			$http.get(POSTS_URL)
				.then(
					function (response) {
						data.posts = response.data;
						setTimeout(function () {
								posts.resolve(data);

						}, 3000);
						
					}, 
					function (response) {
						///////////////
						//if error is encountered leave posts cached data alone 
						//but reject with error response so UI may alert user - not yet implemented.
						///////////////
						posts.reject(response);
					}
				);
			return posts.promise
		};

		return {
			get: get,
			getAll: getAll
		};

	}]);