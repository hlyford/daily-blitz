var Roster = require('../models/rosterModel');
var removeDiacritics = require('../jobs/removeDiacritics');
var formatPlayerNames = require('../jobs/formatPlayerNames').formatPlayerNames;

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
		} else {
			data.conference = 'eastern';
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
			console.log(data.team_name + ' added');
		});
	},
	getAllRosters: function (league, callback, getPlayerData) {
		getPlayerData = getPlayerData || 0;
		// find all rosters
		Roster.find({},{players: getPlayerData}, function (err, result) {
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