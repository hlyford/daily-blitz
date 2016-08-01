var getRosters = require('./nba_scraper');
var teamsArray = require('./team_acronyms');
var getRostersNfl = require('./nfl_scraper');
var teamsArrayNfl = require('./team_acronyms_nfl');

// loop through waiting a random amount of seconds each time
var looper = function (i) {
	var nextWait = Math.floor(Math.random() * (40000 - 10000) + 10000);
	console.log('waiting...', nextWait);
	// EDIT THIS LINE TO CHANGE HOW MANY TEAMS TO GET
	if (i < 1) {
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
// looper(0);

// *** NFL *****
// loop through waiting a random amount of seconds each time
var looperNfl = function (i) {
	var nextWait = Math.floor(Math.random() * (40000 - 10000) + 10000);
	console.log('waiting...', nextWait);
	// EDIT THIS LINE TO CHANGE HOW MANY TEAMS TO GET
	if (i < 1) {
		getRostersNfl(teamsArrayNfl[i]);
		setTimeout(function () {
			looper(i + 1);
		}, nextWait);
	}	else {
		console.log('done');
		return;
	}
};

// start at the beginning of teams array
looperNfl(0);