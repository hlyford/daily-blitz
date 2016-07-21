var Roster = require('../models/rosterModel');

module.exports = {

	addRoster: function (data, callback) {
		// call on the model to create the quiz
		console.log('in controller', data);
		var playersArray = [];
		for (player in data.players) {
			playersArray.push(data.players[player]);
		}
		// Roster.create({name: 'kobe'}).then (function() {
		// 	console.log('hehhreh');
		// 	callback('hihih');
		// });
		Roster.create({
			name: data.name,
			acronym: data.acronym,
			conference: "western",
			players: playersArray
		}).then( function(result) {
				if (err) return handleError(err);
				console.log('hre agani',result);
				callback(result);
			});
	},

	getRosters: function (callback) {
		// find all rosters
		Roster.find()
			.then( function (result) {
				callback(result);
			});

	}
}
