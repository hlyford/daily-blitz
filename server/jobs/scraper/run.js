var getRostersNba = require('./nba_scraper');
var teamsArray = require('./team_acronyms');
// var getRostersNfl = require('./nfl_scraper');
var teamsArrayNfl = require('./team_acronyms').nfl;

var getRostersMlb = require('./mlb_scraper');
var teamsArrayMlb = require('./team_acronyms').mlb;

var getRostersSoccer = require('./soccer_scraper');
var teamsArraySoccer = require('./team_acronyms').soccer;

// loop through waiting a random amount of seconds each time
var looper = function (i) {
	var nextWait = Math.floor(Math.random() * (40000 - 10000) + 10000);
	console.log('waiting...', nextWait);
	// EDIT THIS LINE TO CHANGE HOW MANY TEAMS TO GET
	if (i < 1) {
		getRostersNba(teamsArray[i]);
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

// *** Soccer *****
// loop through waiting a random amount of seconds each time
var looperSoccer = function (i) {
	var nextWait = Math.floor(Math.random() * (20000 - 10000) + 10000);
	console.log('waiting...', nextWait);
	// EDIT THIS LINE TO CHANGE HOW MANY TEAMS TO GET
	if (i < 1) {
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
// looperNfl(5)
looperSoccer(0);