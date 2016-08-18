var getRostersNba = require('./nba_scraper');
var teamsArray = require('./team_acronyms').nba;
var getRostersNfl = require('./nfl_scraper');
var teamsArrayNfl = require('./team_acronyms').nfl;

var getRostersMlb = require('./mlb_scraper');
var teamsArrayMlb = require('./team_acronyms').mlb;

var getRostersSoccer = require('./soccer_scraper');
var teamsArraySoccer = require('./team_acronyms').soccer;

// loop through waiting a random amount of seconds each time
// ***** NBA  // there are 30 teams
var looper = function (i) {
	var nextWait = Math.floor(Math.random() * (40000 - 10000) + 10000);
	console.log('waiting...', nextWait);
	// EDIT THIS LINE TO CHANGE HOW MANY TEAMS TO GET
	if (i < 30) {
		getRostersNba(teamsArray[i]);
		setTimeout(function () {
			looper(i + 1);
		}, nextWait);
	}	else {
		console.log('done');
		return;
	}
};
looper(16);

// *** NFL ***** // there are 32 teams
// loop through waiting a random amount of seconds each time
var looperNfl = function (i) {
	var nextWait = Math.floor(Math.random() * (20000 - 10000) + 10000);
	console.log('waiting...', nextWait);
	// EDIT THIS LINE TO CHANGE HOW MANY TEAMS TO GET
	if (i < 32) {
		getRostersNfl(teamsArrayNfl[i]);
		setTimeout(function () {
			looperNfl(i + 1);
		}, nextWait);
	}	else {
		console.log('done');
		return;
	}
};
// looperNfl(6);

// *** MLB ***** // there are 30 teams
// loop through waiting a random amount of seconds each time
var looperMlb = function (i) {
	var nextWait = Math.floor(Math.random() * (20000 - 10000) + 10000);
	console.log('waiting...', nextWait);
	// EDIT THIS LINE TO CHANGE HOW MANY TEAMS TO GET
	if (i < 30) {
		getRostersMlb(teamsArrayMlb[i]);
		setTimeout(function () {
			looperMlb(i + 1);
		}, nextWait);
	}	else {
		console.log('done');
		return;
	}
};

// *** Soccer ***** // there are 20 teams
// loop through waiting a random amount of seconds each time
var looperSoccer = function (i) {
	var nextWait = Math.floor(Math.random() * (20000 - 10000) + 10000);
	console.log('waiting...', nextWait);
	// EDIT THIS LINE TO CHANGE HOW MANY TEAMS TO GET
	if (i < 3) {
		getRostersSoccer(teamsArraySoccer[i]);
		setTimeout(function () {
			looperSoccer(i + 1);
		}, nextWait);
	}	else {
		console.log('done');
		return;
	}
};

// start at the beginning of teams array
// looperSoccer(0);