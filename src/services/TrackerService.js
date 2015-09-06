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

		var ISOStringToDate = function (ISO_String) {
			var day, month, splitISO, year;

			splitISO = ISO_String.split('-');

			year = parseInt(splitISO[0]);
			//months are zero-based when creating with separate arguments in Date constructor
			month = parseInt(splitISO[1]) - 1;
			day = parseInt(splitISO[2]);

			return new Date(year, month, day);
		};

		var formatData = function (data) {

			var day, 
				i = 0,
				isoDate,
				nextAvailable,
				nextDay;

			//first sort data
			data.sort(function(a, b){ 
				return new Date(a.date) - new Date(b.date); 
			});
			
			//evaluate length of data each time because data may grow if additional tracker data needs to be inserted.
			for(i; i < data.length - 1; i++){
				day = ISOStringToDate(data[i].date);
				nextDay = new Date(day);
				nextDay.setDate(nextDay.getDate() + 1);
				nextAvailable = ISOStringToDate(data[i + 1].date);
				
				if(nextDay.toISOString() != nextAvailable.toISOString()){
					//use isoDate to generate temporary unique front-end id for this data set.
					data.splice(i + 1, 0, {
						id: nextDay.getTime(),
						hits: 0,
						date: nextDay.toISOString().split('T')[0]
					});
				}	

			}

			return data;
		};

		var getHits = function (fromDate, toDate) {

			var hits = $q.defer();

			$http.get(_getUrl(fromDate, toDate))
				.then(
					function (res) {

						var response = {
							data: formatData(res.data.data)
						};

						hits.resolve(response);

					}, 
					function (error) {
						hits.reject(error);
					}
				);

			return hits.promise;

		};

		return {
			formatData: formatData,
			getHits: getHits
		};

	}]);