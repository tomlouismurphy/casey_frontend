angular
	.module('appRoutes', ["ui.router"])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
		$stateProvider.state({
			name: 'baseball',
			url: '/',
			templateUrl: 'public/components/baseball/templates/baseball.template',
			controller: 'MainController'
	});

	$urlRouterProvider.otherwise('/');
}])