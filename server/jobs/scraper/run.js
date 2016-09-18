var getRostersNba = require('./nba_scraper');
var teamsArray = require('./team_acronyms').nba;
var getRostersNfl = require('./nfl_scraper');
var teamsArrayNfl = require('./team_acronyms').nfl;

var getRostersMlb = require('./mlb_scraper');
var teamsArrayMlb = require('./team_acronyms').mlb;

var getRostersSoccer = require('./soccer_scraper');
var teamsArraySoccer = require('./team_acronyms').soccer;

// read the command arg to determine league; numbers and start and end indexes of teams
switch (process.argv[2]) {
	case 'nba':
		looper(29, 30);
		break;
	case 'nfl':
		looperNfl(31, 32);
		break;
	case 'mlb':
		looperMlb(29, 30);
		break;
	case 'soccer':
		looperSoccer(19, 20);
		break;
};

// loop through waiting a random amount of seconds each time
// ***** NBA  // there are 30 teams
function looper (start, end) {
	var nextWait = Math.floor(Math.random() * (20000 - 10000) + 10000);
	console.log('waiting...', nextWait);
	if (start < end) {
		getRostersNba(teamsArray[start]);
		setTimeout(function () {
			looper(start + 1);
		}, nextWait);
	}	else {
		console.log('done');
		return;
	}
};


// *** NFL ***** // there are 32 teams
// loop through waiting a random amount of seconds each time
function looperNfl (start, end) {
	var nextWait = Math.floor(Math.random() * (20000 - 10000) + 10000);
	console.log('waiting...', nextWait);
	// EDIT THIS LINE TO CHANGE HOW MANY TEAMS TO GET
	if (start < end) {
		getRostersNfl(teamsArrayNfl[start]);
		setTimeout(function () {
			looperNfl(start + 1);
		}, nextWait);
	}	else {
		console.log('done');
		return;
	}
};

// *** MLB ***** // there are 30 teams
// loop through waiting a random amount of seconds each time
function looperMlb (start, end) {
	var nextWait = Math.floor(Math.random() * (20000 - 10000) + 10000);
	console.log('waiting...', nextWait);
	if (start < end) {
		getRostersMlb(teamsArrayMlb[start]);
		setTimeout(function () {
			looperMlb(start + 1);
		}, nextWait);
	}	else {
		console.log('done');
		return;
	}
};

// *** Soccer ***** // there are 20 teams
// loop through waiting a random amount of seconds each time
function looperSoccer (start, end) {
	var nextWait = Math.floor(Math.random() * (20000 - 10000) + 10000);
	console.log('waiting...', nextWait);
	if (start < end) {
		getRostersSoccer(teamsArraySoccer[start]);
		setTimeout(function () {
			looperSoccer(start + 1);
		}, nextWait);
	}	else {
		console.log('done');
		return;
	}
};