describe('TrackerService', function () {

	var $httpBackend,
		//$interpolate,
		trackerService,
		testUrl;

	beforeEach(module('kargo'));

	beforeEach(inject(function($injector){

		$httpBackend = $injector.get('$httpBackend');
		// $interpolate = $injector.get('$interpolate');
		trackerService = $injector.get('TrackerService');
		// //testUrl = $interpolate(TrackerService.getUrl);
		// testUrl = $injector.get('TRACKER_URL');

		// $httpBackend.when('GET', testUrl)
		// 	.respond({ data: [
		// 		{
		// 			id: 1,
		// 			hits: 9271,
		// 			date: "2015-01-01"
		// 		},
		// 		{
		// 			id: 7,
		// 			hits: 4125,
		// 			date: "2015-01-02"
		// 		}
		// 	]});

	}));

	// afterEach(function() {

 //    	$httpBackend.verifyNoOutstandingExpectation();
 //     	$httpBackend.verifyNoOutstandingRequest();

 //    });

    it('should have httpBackend defined', function () {
		expect($httpBackend).toBeDefined();
	});

    // it('should be defined', function () {
    // 	expect(TrackerService).toBeDefined();
    // });

 //    it('should return data', function () {
 //    	var hits = TrackerService.getHits('2015-01-01', '2015-03-20');
 //    	$httpBackend.flush();
 //    	console.log(hits);
 //    	//expect
 //    });


});