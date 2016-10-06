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
		// var allTeamsByLeague = {};
		// for (var league in allTeams) {
		// 	var allTeamsInLeague = {};
		// 	// loop through each team in the league
		// 	allTeams[league].forEach( function (team, index) {
		// 		// set the key value-pair as 'acronym' : [team_object]
		// 		allTeamsInLeague[team.acronym] = team;
		// 	});
		// 	// add all the teams to the main object
		// 	allTeamsByLeague[league] = allTeamsInLeague;
		// }

		// for (var league in allTeamsByLeague) {
		// 	// loop through each team making a key-value pair like 'nbagsw' : '[object]'
		// 	for (var team in allTeamsByLeague[league]) {
		// 		var team = allTeamsByLeague[league][team];
		// 		client.hmset(league + team.acronym, 'team_name', team.team_name, 'acronym', team.acronym, 'conference', team.conference, 'league', team.league, 'players', team.players, function(error, result) {
		// 			if (error) console.log('Error: ' + error);
		// 			else {
		// 				console.log(result);
		// 			}
		// 		});
		// 	};
		// }

		// add the team info WITHOUT players
		// loop through each league in allTeams
		var allTeamsByLeague = {};
		for (var league in allTeams) {
			var allTeamsInLeague = [];
			// loop through each team in the league
			allTeams[league].forEach( function (team, index) {
				// set the key value-pair as 'acronym' : [team_object]
				team.players = null;
				allTeamsInLeague.push(team);
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
		this.client.get(league + acronym, function (err, reply) {
			if (err) console.log(err);
			// reply = JSON.parse(reply);
			// reply = reply[acronym];
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
