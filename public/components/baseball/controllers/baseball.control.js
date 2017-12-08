app
	.controller('MainController', function($scope, Batter, Pitcher){
		$scope.lineup = [];
		$scope.bench = [];
		this.addToLineup = function(event){
			console.log(event.target.innerText);
		}
		Batter.query().$promise.then(function(data) {
			$scope.batters = data;
			for (let i = 0; i < data.length; i++){
				if (data[i].position !== ''){
					$scope.lineup.push(data[i].name);
				} else {
					$scope.bench.push(data[i].name);
				}
			}
			console.log($scope.lineup);
			console.log($scope.bench);
		});
		Pitcher.query().$promise.then(function(data) {
			$scope.pitchers = data;
		});
})