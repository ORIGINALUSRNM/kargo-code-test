describe('TrackerService', function () {

	var $httpBackend,
		$interpolate,
		TrackerService,
		TRACKER_URL,
		testDates,
		testUrl;

	beforeEach(module('kargo'));

	beforeEach(inject(function($injector){
		$httpBackend = $injector.get('$httpBackend');
		$interpolate = $injector.get('$interpolate');
		TrackerService = $injector.get('TrackerService');
		TRACKER_URL = $injector.get('TRACKER_URL');
		testUrl = $interpolate(TRACKER_URL);
		testDates = [
			{ from: '2015-01-01', to: '2015-01-02' },
			{ from: '2015-01-01', to: '2015-01-03' },
			{ from: '2015-01-01', to: '2015-01-29' },
			{ from: '2014-01-01', to: '2015-01-10'},
			{ from: '2001-01-01', to: '2015-01-10'}
		];	
	}));

	afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
     	$httpBackend.verifyNoOutstandingRequest();
    });

    it('should be defined', function () {
		expect(TrackerService).toBeDefined();
	});

	describe('getHits', function () {

		it('should return data', function () {
	    	$httpBackend.when('GET', testUrl({
	    		fromDate: testDates[0].from,
	    		toDate: testDates[0].to
	    	})).respond({ data: [
				{
					id: 1,
					hits: 9271,
					date: "2015-01-01"
				},
				{
					id: 7,
					hits: 4125,
					date: "2015-01-02"
				}
			]});
	    	
	    	TrackerService.getHits(testDates[0].from, testDates[0].to).then(function (response) {
	    		expect(response.data).toBeDefined();
	    	});

	    	$httpBackend.flush();
    	});

    	it('should add a dummy data point if one date is missing', function () {
    		//////////////////////
    		//this is partially an integration test b/c it tests the request as well as the formatData
    		//method which is tested in isolation below. 
    		/////////////////////
	    	$httpBackend.when('GET', testUrl({
	    		fromDate: testDates[1].from,
	    		toDate: testDates[1].to
	    	})).respond({ data: [
				{
					id: 1,
					hits: 9271,
					date: "2015-01-01"
				},
				{
					id: 7,
					hits: 4125,
					date: "2015-01-03"
				}
			]});

			TrackerService.getHits(testDates[1].from, testDates[1].to).then(function (response) {
				var addedData = response.data[1];

	    		expect(response.data.length).toBe(3);
	    		expect(addedData.hits).toBe(0);
	    		expect(addedData.date).toBe('2015-01-02');
	    		expect(addedData.id).toBeDefined();

	    	});

	    	$httpBackend.flush();

    	});

	});

    describe('formatData', function () {

    	it('should add multiple missing data points when multiple are missing', function () {
    		var data, result;

    		data = [
    			{
					id: 1,
					hits: 9271,
					date: testDates[2].from
				},
				{
					id: 7,
					hits: 4125,
					date: testDates[2].to
				}
    		];

    		result = TrackerService.formatData(data);
    		expect(result.length).toBe(29);
    	});

    	it('should add missing data points when dates have different years', function () {
    		var data, data2, result, result2;

    		data = [
    			{
					id: 1,
					hits: 9271,
					date: testDates[3].from
				},
				{
					id: 7,
					hits: 4125,
					date: testDates[3].to
				}
    		];

    		data2 = [
    			{
					id: 1,
					hits: 9271,
					date: testDates[4].from
				},
				{
					id: 7,
					hits: 4125,
					date: testDates[4].to
				}
    		];

    		result = TrackerService.formatData(data);
    		result2 = TrackerService.formatData(data2);

    		expect(result.length).toBe(375);
    		expect(result2.length).toBe(5123);

    	});
    });

});