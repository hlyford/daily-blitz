var getRosters = require('./nba_scraper');
var teamsArray = require('./team_acronyms');
var getRostersNfl = require('./nfl_scraper');
var teamsArrayNfl = require('./team_acronyms_nfl');
var getRostersMlb = require('./mlb_scraper');
var teamsArrayMlb = require('./team_acronyms_mlb');

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
	var nextWait = Math.floor(Math.random() * (20000 - 10000) + 10000);
	console.log('waiting...', nextWait);
	// EDIT THIS LINE TO CHANGE HOW MANY TEAMS TO GET
	if (i < 6) {
		getRostersNfl(teamsArrayNfl[i]);
		setTimeout(function () {
			looperNfl(i + 1);
		}, nextWait);
	}	else {
		console.log('done');
		return;
	}
};

// *** MLB *****
// loop through waiting a random amount of seconds each time
var looperMlb = function (i) {
	var nextWait = Math.floor(Math.random() * (20000 - 10000) + 10000);
	console.log('waiting...', nextWait);
	// EDIT THIS LINE TO CHANGE HOW MANY TEAMS TO GET
	if (i < 31) {
		getRostersMlb(teamsArrayMlb[i]);
		setTimeout(function () {
			looperMlb(i + 1);
		}, nextWait);
	}	else {
		console.log('done');
		return;
	}
};


// start at the beginning of teams array
// looperNfl(5)
looperMlb(10);