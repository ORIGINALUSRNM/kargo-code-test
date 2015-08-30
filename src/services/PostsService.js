angular.module('kargo')

	.factory('PostsService', ['$http', '$q', 'POSTS_URL', function ($http, $q, POSTS_URL) {

		var data = {
			posts: []
		};

		var add = function () {
			//Test function to make sure service is properly working and users of this service update
			var posts = data.posts;
			var newId = posts[posts.length - 1].id + 1;

			posts.push({ 
				id: newId,
				title: new Date()
			});

			data.posts = posts;
		};

		var getAll = function () {

			var posts = $q.defer();
			
			///////////
			//jsonplaceholder api set to allow all origins so no cross origin issues.
			///////////
			$http.get('http://jsonplaceholder.typicode.com/posts')
				.then(
					function (response) {
						data.posts = response.data;
						posts.resolve(data);
					}, 
					function (response) {
						debugger;
					}
				);

			return posts.promise

		};

		return {

			add: add,
			getAll: getAll

		};
	}]);