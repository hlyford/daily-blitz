var Roster = require('../models/rosterModel');

module.exports = {
	addStuff: function(data) {
		Roster.create({team_name: data.team_name, acronym: data.acronym, conference: 'western', players: data.players});
	},
	getAllRosters: function (callback) {
		// find all rosters
		Roster.find()
			.then( function (result) {
				callback(result);
			});

	},
	getRoster: function (acronym, callback) {
		Roster.find({acronym: acronym})
			.then( function (result) {
				callback(result);
			})
	}
}
