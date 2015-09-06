angular.module('kargo')
	.directive('loadingImage', function () {
		return {
			restrict: 'AE',
			replace: true,
			template: '<div class="fa fa-circle-o-notch fa-spin" ng-style="style" ng-show="loading"></div>',
			scope: {
				loading: '=',
				fontSize: '@'
			},
			link: function (scope, element, attrs) {
				var style;

				style = {
					'font-size': attrs.fontSize || '1em',
					'color': attrs.color || 'red',
					'margin': '50px auto',
					'text-align': 'center',
					'display': 'block'
				};

				scope.style = style;

			}
		};
	});