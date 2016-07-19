// var Roster = require('./rosterModel');
var mongoose = require('mongoose');

var RostersSchema = new mongoose.Schema({
 name: String,
 players: Array
 },
 {collection: 'rosters'}
);

var Roster = mongoose.model('Rosters', RostersSchema, 'Rosters');

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
	}
}