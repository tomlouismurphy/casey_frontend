angular
	.module('appRoutes', ["ui.router"])
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		})
		$stateProvider
			.state('baseball', {
				url: '/',
				templateUrl: 'public/components/baseball/templates/baseball.template',
				controller: 'MainController',
				controllerAs: 'main'
			})
	$urlRouterProvider.otherwise('/');
}])