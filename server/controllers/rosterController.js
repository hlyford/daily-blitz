var Roster = require('../models/rosterModel');

module.exports = {
	addStuff: function(data) {
		// find and delete the current listing for that team
		Roster.find({acronym: data.acronym}).remove(function (err, result) {
		  if (err) console.log('error', err);
		  else {
		  	console.log('removed', result.result);
		  }
		});
		// determine the conference
		var westernTeams = ['gsw','lac','lal','pho','sac','dal','hou','mem','nor','sas','den','min','okc','por','uth'];
		if (westernTeams.indexOf(data.acronym) !== -1) {
			data.conference = 'western';
		}
		// give the players the required fields
		data.players.forEach( function (player, index) {
			// loop from the back of the player name looking for space and forming last name
			var lastName = '', firstName;
			for (var i = player.name.length - 1; i > 0; i--) {

				if (player.name[i] === ' ') {
					data.players[index].lastName = lastName.split("").reverse().join("");
					// the rest of the string is the first name
					var endFirstNameIndex = i;
					firstName = player.name.slice(0, endFirstNameIndex);
					break;
				} else {
					lastName += player.name[i];
				}
			}
			data.players[index].firstName = firstName;
			data.players[index].firstNameLower = firstName.toLowerCase();
			data.players[index].lastNameLower = data.players[index].lastName.toLowerCase();
			// add the full name and lowercase
			data.players[index].fullName = data.players[index].name;
			data.players[index].fullNameLower = data.players[index].name.toLowerCase();
		})

		Roster.create({
			team_name: data.team_name,
			acronym: data.acronym,
			conference: data.conference,
			players: data.players,
			league: data.league
		}).then(function () {
			console.log(data.team_name + ' added to db');
		});
	},
	getAllRosters: function (league, callback) {
		// find all rosters
		Roster.find({},{players: 0}, function (err, result) {
		  if (err) console.log('error',err);
		  callback(result);

		});
	},
	getRoster: function (acronym, callback) {
		Roster.find({acronym: acronym})
			.then( function (result, error) {
				callback(result);
			})
	}
}