	// SWITCH THE MODELS BELOW TO DETERMINE WHAT TEAM TO INSERT
var RosterNba = require('../models/rosterModel');
var RosterNfl = require('../models/rosterNflModel');
var RosterMlb = require('../models/RosterMlbModel');
var RosterSoccer = require('../models/rosterSoccerModel');
// current roster
var Roster;

var Rosters = {nba: RosterNba, nfl: RosterNfl, mlb: RosterMlb, soccer: RosterSoccer};

module.exports = {
	addStuff: function(league, data, server) {
		data.forEach(function(team, index) {
			Roster = Rosters[league];
			Roster.find({acronym: team.acronym}).remove(function (err, result) {
			  if (err) console.log('error', err);
			  else {
			  	console.log('removed', result.result);
			  	Roster.create(team).then(function () {
			  		console.log(team.team_name + ' added to db');
			  	});
			  }
			});
		});
		// close the connection
		setTimeout(function() {
			server.close(function() {
		  console.log("Closed out server connection.");
		  process.exit();
			});
		}, 6000);

		this.getAllRosters(function(results) {
			if (results.length > data.length) {
				console.log('done inserting documents to prod');
				server.close(function() {
					console.log('***** closing connection ******');
				});
			}
		})
	},
	getAllRosters: function (callback) {
		// find all rosters[league]
		Roster.find({}, { team_name: 1, acronym: 1, players: 1, _id: 0, conference: 1}).then(function(result) {
			callback(result);
		})
	},
	getRoster: function (acronym, callback) {
		Roster[league].find({acronym: acronym})
			.then( function (result) {
				callback(result);
			})
	}
}