app
	.controller('MainController', function($scope, Batter, Pitcher){
		Batter.query().$promise.then(function(data) {
			$scope.batters = data;
		});
		Pitcher.query().$promise.then(function(data) {
			$scope.pitchers = data;
		});
})