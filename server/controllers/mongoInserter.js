var Roster = require('../models/rosterModel');
var allTeams = require('../jobs/scraper/allTeams.js');

module.exports = {
	addStuff: function(data) {
		data.forEach(function(team, index) {
			Roster.create(team).then(function () {
				console.log(team.team_name + ' added to db');
			});
		})

		this.getAllRosters(function(results) {
			if (results.length > 29) {
				console.log('done inserting documents to prod');
			}
		})
	},
	getAllRosters: function (callback) {
		// find all rosters
		Roster.find({ acronym: "gsw"},
    { team_name: 1, acronym: 1, players: 1, _id: 0})
			.then( function (result) {
				var teams = [];
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
module.exports.addStuff(allTeams);