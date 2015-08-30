angular.module('kargo')

	.factory('TrackerService', ['$http', '$interpolate', '$q', 'TRACKER_URL', function ($http, $interpolate, $q, TRACKER_URL) {

		var urlTemplate = $interpolate(TRACKER_URL);
		var defaultFrom = '2015-01-01';
		var defaultTo = '2015-03-01';

		var _getUrl = function (from, to) {

			var fromDate = from || defaultFrom;
			var toDate = to || defaultTo;

			return urlTemplate({ fromDate: fromDate, toDate: toDate });

		};

		var getHits = function (fromDate, toDate) {

			var hits = $q.defer();

			$http.get(_getUrl(fromDate, toDate))
				.then(
					function (res) {
						hits.resolve(res);
					}, 
					function (error) {
						hits.reject(error);
					}
				);

			return hits.promise;

		};

		return {
			getHits: getHits
		};

	}]);