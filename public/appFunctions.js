const leagueOBP2014 = .314;

const hitterPitcherMatchup = (batterOBP, pitcherOBP) => {
	(batterOBP * pitcherOBP / leagueOBP2014) / 
	(batterOBP * pitcherOBP / leagueOBP2014 + 
	(1 - batterOBP) * (1 - pitcherOBP) / (1 - leagueOBP2014));
}

const calculatebatterOBP = () => {
	console.log('test');
}