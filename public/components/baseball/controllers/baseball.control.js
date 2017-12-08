app
	.controller('MainController', function($scope, Batter, Pitcher){
		$scope.lineup = [];
		$scope.bench = [];
		$scope.pitchingstaff = [];
		$scope.pinchHitter = '';
		$scope.playerSubstituted = '';
		$scope.activePitcher = 'Madison Bumgarner';
		$scope.outs = 0;
		$scope.royalsScore = 2;
		$scope.firstBase = '';
		$scope.secondBase = '';
		$scope.thirdBase = '';
		$scope.currentOBP = 0;
		$scope.currentHRPer = 0;
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
		this.calculateCurrentStats = function (){
			const leagueOBP2014 = .314;
			const pitcherOBP = 0.2784;
			let batterOBP = 0;
			let batterHRPer = 0;
			for (let i = 0; i < $scope.batters.length; i++){
				if ($scope.batters[i].name === $scope.lineup[0]){
					batterOBP = ($scope.batters[i].hits + $scope.batters[i].walks + $scope.batters[i].hit_by_pitch)/($scope.batters[i].at_bats + $scope.batters[i].walks + $scope.batters[i].hit_by_pitch + $scope.batters[i].sacrifice_flies);
					batterHRPer = $scope.batters[i].home_runs / ($scope.batters[i].hits + $scope.batters[i].walks + $scope.batters[i].hit_by_pitch)
				}
			}
			const atBatProb = (batterOBP * pitcherOBP / leagueOBP2014) / 
								(batterOBP * pitcherOBP / leagueOBP2014 + 
								(1 - batterOBP) * (1 - pitcherOBP) / (1 - leagueOBP2014));
			$scope.currentOBP = Math.round(atBatProb * 1000) / 1000;
			$scope.currentHRPer = Math.round($scope.currentOBP * batterHRPer * 1000) / 10;
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
			for (let i = 0; i < data.length; i++){
				$scope.pitchingstaff.push(data[i].name);
			}
		});
		this.atBat = function(){
			if ($scope.outs === 3){
				return 'game over';
			}
			let hit = '';
			const currentBatter = $scope.lineup[0];
			console.log(currentBatter);
			const leagueOBP2014 = .314;
			const pitcherOBP = 0.2784;
			let batterOBP = 0;
			for (let i = 0; i < $scope.batters.length; i++){
				if ($scope.batters[i].name === $scope.lineup[0]){
					batterOBP = ($scope.batters[i].hits + $scope.batters[i].walks + $scope.batters[i].hit_by_pitch)/($scope.batters[i].at_bats + $scope.batters[i].walks + $scope.batters[i].hit_by_pitch + $scope.batters[i].sacrifice_flies);
				}
			}
			const atBatProb = (batterOBP * pitcherOBP / leagueOBP2014) / 
								(batterOBP * pitcherOBP / leagueOBP2014 + 
								(1 - batterOBP) * (1 - pitcherOBP) / (1 - leagueOBP2014));
			if (Math.random() > atBatProb){
				$scope.outs++;
				$scope.lineup.shift();
				$scope.lineup.push(currentBatter);
			} else {
				for (let i = 0; i < $scope.batters.length; i++){
					if ($scope.batters[i].name === $scope.lineup[0]){
						const hitIndicator = Math.random() * ($scope.batters[i].hits + $scope.batters[i].walks + $scope.batters[i].hit_by_pitch + 1);
						if (hitIndicator < $scope.batters[i].hit_by_pitch && hit === ''){
							hit = 'HBP';
						} else if (hitIndicator < $scope.batters[i].hit_by_pitch + $scope.batters[i].walks && hit === ''){
							hit = 'BB';
						} else if (hitIndicator < $scope.batters[i].hit_by_pitch + $scope.batters[i].walks + $scope.batters[i].singles && hit === ''){
							hit = '1B';
						} else if (hitIndicator < $scope.batters[i].hit_by_pitch + $scope.batters[i].walks + $scope.batters[i].singles + $scope.batters[i].doubles && hit === ''){
							hit = '2B';
						} else if (hitIndicator < $scope.batters[i].hit_by_pitch + $scope.batters[i].walks + $scope.batters[i].singles + $scope.batters[i].doubles + $scope.batters[i].triples && hit === ''){
							hit = '3B';
						} else {
							hit = 'HR';
						}
						console.log(hit);
					}
				}
				if (hit === 'HR'){
					$scope.royalsScore++;
					if ($scope.thirdBase !== ''){
						$scope.thirdBase = '';
						$scope.royalsScore++;
					}
					if ($scope.secondBase !== ''){
						$scope.secondBase = '';
						$scope.royalsScore++;
					}
					if ($scope.firstBase !== ''){
						$scope.firstBase = '';
						$scope.royalsScore++;
					}
				} else if (hit === '3B'){
					if ($scope.thirdBase !== ''){
						$scope.thirdBase = currentBatter;
						$scope.royalsScore++;
					}
					if ($scope.secondBase !== ''){
						$scope.secondBase = '';
						$scope.royalsScore++;
					}
					if ($scope.firstBase !== ''){
						$scope.firstBase = '';
						$scope.royalsScore++;
					}
					$scope.thirdBase = currentBatter;
				} else if (hit === '2B'){
					if ($scope.thirdBase !== ''){
						$scope.thirdBase = '';
						$scope.royalsScore++;
					}
					if ($scope.secondBase !== ''){
						$scope.secondBase = currentBatter;
						$scope.royalsScore++;
					}
					if ($scope.firstBase !== ''){
						$scope.thirdBase = $scope.firstBase;
						$scope.firstBase = '';
					}
					$scope.secondBase = currentBatter;
				} else {
					if ($scope.thirdBase !== ''){
						$scope.thirdBase = '';
						$scope.royalsScore++;
					}
					if ($scope.secondBase !== ''){
						$scope.thirdBase = $scope.secondBase;
						$scope.secondBase = '';
					}
					if ($scope.firstBase !== ''){
						$scope.secondBase = $scope.firstBase;
						$scope.firstBase = currentBatter;
					}
					$scope.firstBase = currentBatter;
				}
				$scope.lineup.shift();
				$scope.lineup.push(currentBatter);
			}
		}
})