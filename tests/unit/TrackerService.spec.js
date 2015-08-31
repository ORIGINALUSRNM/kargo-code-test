describe('TrackerService', function () {

	var $httpBackend,
		$interpolate,
		TrackerService,
		TRACKER_URL,
		testUrl;

	beforeEach(module('kargo'));

	beforeEach(inject(function($injector){

		$httpBackend = $injector.get('$httpBackend');
		$interpolate = $injector.get('$interpolate');
		TrackerService = $injector.get('TrackerService');
		TRACKER_URL = $injector.get('TRACKER_URL');
		testUrl = $interpolate(TRACKER_URL);
		

		$httpBackend.when('GET', testUrl('2015-01-01', '2015-03-20'))
			.respond({ data: [
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

	}));

	afterEach(function() {

    	$httpBackend.verifyNoOutstandingExpectation();
     	$httpBackend.verifyNoOutstandingRequest();

    });

    it('should be defined', function () {
		expect(TrackerService).toBeDefined();
	});

    it('should return data', function () {
    	$httpBackend.expectGET(testUrl('2015-01-01', '2015-03-20'));
    	var hits = TrackerService.getHits('2015-01-01', '2015-03-20');
    	$httpBackend.flush();
    	console.log(hits);
    	//expect
    });


});