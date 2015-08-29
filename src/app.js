angular.module('kargo', ['ui.router'])
	.run(function ($rootScope) {
		$rootScope.name = "bob";
	});