// SWITCH THE MODELS BELOW TO DETERMINE WHAT TEAM TO INSERT
var Roster = require('../models/rosterModel');
var RosterNfl = require('../models/rosterNflModel');
var RosterMlb = require('../models/rosterMlbModel');
var allTeams = require('../jobs/scraper/allTeams.js').mlb;

module.exports = {
	addStuff: function(data) {
		data.forEach(function(team, index) {
			RosterMlb.find({acronym: team.acronym}).remove(function (err, result) {
			  if (err) console.log('error', err);
			  else {
			  	console.log('removed', result.result);
			  	RosterMlb.create(team).then(function () {
			  		console.log(team.team_name + ' added to db');
			  	});
			  }
			});
		})

		this.getAllRosters(function(results) {
			if (results.length > data.length) {
				console.log('done inserting documents to prod');
			}
		})
	},
	getAllRosters: function (callback) {
		// find all rosters
		RosterMlb.find({}, { team_name: 1, acronym: 1, players: 1, _id: 0, conference: 1}).then(function(result) {
			callback(result);
		})
	},
	getRoster: function (acronym, callback) {
		RosterMlb.find({acronym: acronym})
			.then( function (result) {
				callback(result);
			})
	}
}