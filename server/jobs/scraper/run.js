var getRosters = require('./scraper');
var teamsArray = require('./team_acronyms');

// loop through waiting a random amount of seconds each time
var looper = function (i) {
	var nextWait = Math.floor(Math.random() * (40000 - 10000) + 10000);
	console.log('waiting...', nextWait);
	if (i < 10) {
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
looper(1);