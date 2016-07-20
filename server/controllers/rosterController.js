var mongoose = require('mongoose');
var Roster = require('../models/rosterModel');
var db = require('../server.js');
console.log('here',db.db);

module.exports = {

	addRoster: function (data, callback) {
		// call on the model to create the quiz

		var team_name = data.name;
		var playersArray = [];
		for (player in data.players) {
			playersArray.push(data.players[player]);
		}
		Roster.create({
			name: team_name,
			players: playersArray
		}).then(function(result) {
				console.log('hihihi');
				console.log('hre agani',result);
				callback(result);
			});
	},

	getRosters: function (callback) {
		// find all rosters
		dbURI.Roster.find({})
			.then( function (result) {
				console.log('in controller', result);
				callback(result);
			});

	}
}
