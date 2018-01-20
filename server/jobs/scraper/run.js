var getRostersNba = require('./nba_scraper');
var teamsArray = require('./team_acronyms').nba;
var getRostersNfl = require('./nfl_scraper');
var teamsArrayNfl = require('./team_acronyms').nfl;

var getRostersMlb = require('./mlb_scraper');
var teamsArrayMlb = require('./team_acronyms').mlb;

var getRostersSoccer = require('./soccer_scraper');
var teamsArraySoccer = require('./team_acronyms').soccer;

// Stats scrapers
var nbaStatsScraper = require('./nbaStatsScraper');

// read the command arg to determine league; numbers and start and end indexes of teams
switch (process.argv[2]) {
	case 'nba':
		looper(21, 22);
		break;
	case 'nfl':
		looperNfl(0, 32);
		break;
	case 'mlb':
		looperMlb(0, 30);
		break;
	case 'soccer':
		looperSoccer(0, 20);
	case 'stats-nba':
		looperNbaStats(1, 2);
		break;
};

// loop through waiting a random amount of seconds each time
// ***** NBA  // there are 30 teams
function looper (start, end) {
	var nextWait = Math.floor(Math.random() * (8000 - 4000) + 4000);
	console.log('waiting...', nextWait);
	if (start < end) {
		getRostersNba(teamsArray[start]);
		setTimeout(function () {
			looper(start + 1, end);
		}, nextWait);
	}	else {
		console.log('done');
		return;
	}
};

// ***** NBA STATS // there are 30 teams
function looperNbaStats (start, end) {
	var nextWait = Math.floor(Math.random() * (8000 - 4000) + 4000);
	console.log('waiting...', nextWait);
	if (start < end) {
		nbaStatsScraper(teamsArray[start]);
		setTimeout(function () {
			looper(start + 1, end);
		}, nextWait);
	}	else {
		console.log('done');
		return;
	}
};


// *** NFL ***** // there are 32 teams
// loop through waiting a random amount of seconds each time
function looperNfl (start, end) {
	var nextWait = Math.floor(Math.random() * (9000 - 3000) + 3000);
	console.log('waiting...', nextWait);
	// EDIT THIS LINE TO CHANGE HOW MANY TEAMS TO GET
	if (start < end) {
		getRostersNfl(teamsArrayNfl[start]);
		setTimeout(function () {
			looperNfl(start + 1, end);
		}, nextWait);
	}	else {
		console.log('done');
		return;
	}
};

// *** MLB ***** // there are 30 teams
// loop through waiting a random amount of seconds each time
function looperMlb (start, end) {
	var nextWait = Math.floor(Math.random() * (6000 - 3000) + 3000);
	console.log('waiting...', nextWait);
	if (start < end) {
		getRostersMlb(teamsArrayMlb[start]);
		setTimeout(function () {
			looperMlb(start + 1, end);
		}, nextWait);
	}	else {
		console.log('done');
		return;
	}
};

// *** Soccer ***** // there are 20 teams
// loop through waiting a random amount of seconds each time
function looperSoccer (start, end) {
	var nextWait = Math.floor(Math.random() * (8000 - 3000) + 3000);
	console.log('waiting...', nextWait);
	if (start < end) {
		getRostersSoccer(teamsArraySoccer[start]);
		setTimeout(function () {
			looperSoccer(start + 1, end);
		}, nextWait);
	}	else {
		console.log('done');
		return;
	}
};