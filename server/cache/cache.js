// require in the controllers needed to get all data
var rosterController = require('../controllers/rosterController');
var rosterControllerNfl = require('../controllers/rosterControllerNfl');
var rosterControllerMlb = require('../controllers/rosterControllerMlb');
var goatsController = require('../controllers/goatsController');
var rosterControllerSoccer = require('../controllers/rosterControllerSoccer');

module.exports = {

	// object for all the teams with players
	// on server start, call the db and get all the data
	populateAllTeams: function (callback) {
		var allTeams = {};
		rosterController.getAllRostersInsert('nba', function (teams) {

			var teamsObj = {};
			teams.forEach( function (team, index) {
				teamsObj[team.acronym] = team;
			});
			allTeams.nba = teamsObj;
		}, 1);

		rosterControllerNfl.getAllRosters('nfl', function (teams) {
			var teamsObj = {};
			teams.forEach( function (team, index) {
				teamsObj[team.acronym] = team;
			});
			allTeams.nfl = teamsObj;
		}, 1);

		rosterControllerMlb.getAllRosters('mlb', function (teams) {
			// this.allTeams['nba'] = teams;
			var teamsObj = {};
			teams.forEach( function (team, index) {
				teamsObj[team.acronym] = team;
			});
			allTeams.mlb = teamsObj;
		}, 1);

		rosterControllerSoccer.getAllRosters('soccer', function (teams) {
			var teamsObj = {};
			teams.forEach( function (team, index) {
				teamsObj[team.acronym] = team;
			});
			allTeams.soccer = teamsObj;
			callback(allTeams);
		}, 1);
	}

}