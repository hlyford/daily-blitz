var Roster = require('../models/rosterNflModel');
var removeDiacritics = require('../jobs/removeDiacritics');
var formatPlayerNames = require('../jobs/formatPlayerNames').formatPlayerNames;

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
		// determine the conference
		var westernTeams = ['nwe','buf','nyj','mia','cin','bal','cle','pit','jac','ind','hou','ten','den','sdg','oak','kan'];
		if (westernTeams.indexOf(data.acronym) !== -1) {
			data.conference = 'afc';
		} else {
			data.conference = 'nfc';
		}
		// give the players the required fields
		data = formatPlayerNames(data);

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
	getAllRostersInsert: function (league, callback) {
		// find all rosters
		Roster.find({},{_id: 0, time: 0}, function (err, result) {
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