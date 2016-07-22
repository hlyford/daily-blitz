var getRosters = require('./scraper');
var teamsArray = require('./team_acronyms');

// loop through waiting a random amount of seconds each time
var looper = function (i) {
	var nextWait = Math.floor(Math.random() * (80000 - 40000) + 40000);
	console.log('waiting...', nextWait);
	if (i < 2) {
		getRosters(teamsArray[i]);
		setTimeout(function () {
			looper(i + 1);
		}, nextWait);
	}	else {
		console.log('done');
		return;
	}
};

// start at the beginning of teams array
looper(0);