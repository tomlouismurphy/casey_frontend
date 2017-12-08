app
	.controller('MainController', function($scope, Batter, Pitcher){
		$scope.lineup = [];
		$scope.bench = [];
		$scope.pinchHitter = '';
		$scope.playerSubstituted = '';
		this.pinchHit = function(event){
			$scope.pinchHitter = event.target.innerText;
		}
		this.pickSubstitute = function(event){
			$scope.playerSubstituted = event.target.innerText;
		}
		this.addToLineup = function(event){
			for (let i = 0; i < $scope.bench.length; i++){
				if ($scope.bench[i] === event.target.innerText){
					$scope.lineup.push($scope.bench[i]);
					$scope.bench.splice(i, 1);
					console.log($scope.lineup);
				}
			}
			console.log(event.target.innerText);
		}
		this.authorizeReplace = function(){
			for (let i = 0; i < $scope.lineup.length; i++){
				if ($scope.lineup[i] === $scope.playerSubstituted){
					$scope.lineup[i] = $scope.pinchHitter;
				}
			}
			for (let i = 0; i < $scope.bench.length; i++){
				if ($scope.bench[i] === $scope.pinchHitter){
					$scope.bench.splice(i, 1);
				}
			}
			$scope.pinchHitter = '';
			$scope.playerSubstituted = '';
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
		});
		Pitcher.query().$promise.then(function(data) {
			$scope.pitchers = data;
		});
})