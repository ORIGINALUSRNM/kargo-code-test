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
			{ from: '2015-01-01', to: '2015-01-03' }
		];
		

	}));

	afterEach(function() {

    	$httpBackend.verifyNoOutstandingExpectation();
     	$httpBackend.verifyNoOutstandingRequest();

    });

    it('should be defined', function () {
		expect(TrackerService).toBeDefined();
	});

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

    	$httpBackend.expectGET(testUrl({
    		fromDate: testDates[0].from,
    		toDate: testDates[0].to
    	}));
    	
    	TrackerService.getHits(testDates[0].from, testDates[0].to).then(function (response) {
    		expect(response.data).toBeDefined();
    	});

    	$httpBackend.flush();
    });

    it('should add a dummy data point if one date is missing', function () {

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