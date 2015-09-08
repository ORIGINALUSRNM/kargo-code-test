module.exports = function(config) {
	config.set({
		basePath: '.',
		frameworks: ['jasmine'],
		files: [
			'node_modules/angular/angular.min.js',
			'node_modules/angular-mocks/angular-mocks.js',
			'node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.js',
			'node_modules/angular-ui-router/build/angular-ui-router.js',
			'src/**/*.js',
			'tests/unit/**/*.js'
		],
		exclude: [],
		reporters: ['progress'],
		port: 9876,
		colors: true,
		autoWatch: true,
		browsers: ['Chrome'],
		singleRun: false
	})
}