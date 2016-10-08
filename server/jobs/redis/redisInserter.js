var flatten = require('flat');
var unflatten = require('flat').unflatten;

var allTeams = {
	nba: require('../../../allTeams/nba_insert'),
	nfl: require('../../../allTeams/nfl_insert'),
	mlb: require('../../../allTeams/mlb_insert'),
	soccer: require('../../../allTeams/soccer_insert')
};

module.exports = {
	client: undefined,

	setClient: function (client) {
		this.client = client;
	},
	insert: function(client) {
		// add the team info WITH players
		// loop through each league in allTeams
		var allTeamsByLeague = {};
		for (var league in allTeams) {
			var allTeamsInLeague = {};
			// loop through each team in the league
			allTeams[league].forEach( function (team, index) {
				// set the key value-pair as 'acronym-gsw' : [team_object]
				allTeamsByLeague[team.acronym + '-' + league] = team;
			});
		}

		for (var team in allTeamsByLeague) {
			// loop through each team and make string and insert into redis
			var leagueString = JSON.stringify(allTeamsByLeague[team]);
			client.set(team, leagueString, function(err, reply) {
			});
		}

		// add the team info WITHOUT players
		// loop through each league in allTeams
		var allTeamsByLeague = {};
		for (var league in allTeams) {
			var allTeamsInLeague = [];
			// loop through each team in the league
			allTeams[league].forEach( function (team, index) {
				// set the key value-pair as 'acronym' : [team_object]
				delete team['players'];
				delete team['__v'];
				allTeamsInLeague.push(team);
				// allTeamsInLeague[team.acronym] = team;
			});
			// add all the teams to the main object
			allTeamsByLeague[league + '_2'] = allTeamsInLeague;
		}

		for (var league in allTeamsByLeague) {
			var leagueString = JSON.stringify(allTeamsByLeague[league]);
			client.set(league, leagueString, function(err, reply) {
			});
		}
		console.log('Completed.');
	},

	retrieveOneTeam: function (league, acronym, callback) {
		this.client.get(acronym + '-' + league, function (err, reply) {
			if (err) console.log(err);
			reply = JSON.parse(reply);
			callback([reply]);
		});
	},

	retrieveOneLeague: function (league, callback) {
		this.client.get(league + '_2', function (err, reply) {
			if (err) console.log(err);
			reply = JSON.parse(reply);
			callback(reply);
		});
	},

	retrieveAllLeagues: function () {

	},


};
