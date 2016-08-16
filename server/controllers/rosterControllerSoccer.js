var Roster = require('../models/rosterSoccerModel');
var removeDiacritics = require('../jobs/removeDiacritics');

module.exports = {
	addStuff: function(data) {
		// console.log('in nfl controller ', data);
		// find and delete the current listing for that team
		Roster.find({acronym: data.acronym}).remove(function (err, result) {
		  if (err) console.log('error', err);
		  else {
		  	console.log('removed', result.result);
		  }
		});
		// give the players the required fields
		data.players.forEach( function (player, index) {
			// loop from the back of the player name looking for space and forming last name
			var lastName = '', firstName = ''; fullName = '';
			var nameSoFar = '';
			for (var i = 0; i < player.name.length; i++) {
				if (player.name[i] === '-') {
					firstName = nameSoFar;
					firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
					lastName = player.name.slice(i + 1);
					lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
					fullName = firstName + ' ' + lastName;
					break;
				} else {
					nameSoFar += player.name[i];
				}
			}
			data.players[index].firstName = firstName;
			data.players[index].firstNameLower = firstName.toLowerCase();
			data.players[index].lastName = lastName;
			data.players[index].lastNameLower = data.players[index].lastName.toLowerCase();
			// add the full name and lowercase
			data.players[index].fullName = fullName;
			data.players[index].fullNameLower = data.players[index].fullName.toLowerCase();

			// also add each type of name with diacritics removed
			data.players[index].firstName_r = removeDiacritics(firstName);
			data.players[index].firstNameLower_r = removeDiacritics(firstName.toLowerCase());
			data.players[index].lastNameLower_r = removeDiacritics(data.players[index].lastName.toLowerCase());
			data.players[index].lastName_r = removeDiacritics(data.players[index].lastName);
			data.players[index].fullName_r = removeDiacritics(data.players[index].fullName);
			data.players[index].fullNameLower_r = removeDiacritics(data.players[index].fullName.toLowerCase());
			data.players[index].name = fullName;
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