var Roster = require('../models/nbaPlayerModel');
var removeDiacritics = require('../jobs/removeDiacritics');
var formatPlayerNames = require('../jobs/formatPlayerNames').formatPlayerNames;

module.exports = {

  addStuff: function(data) {
    // Give the players the required fields
    data = formatPlayerNames(data);

    // find and delete the current listing for that team
    Roster.find({acronym: data.acronym}).remove(function (err, result) {
      if (err) console.log('error', err);
      else {
        console.log('removed', result.result);
      }
    });

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

  getAllPlayers: function(league, callback) {
    // find all rosters
    Roster.find({}, function (err, result) {
      if (err) console.log('error',err);
      callback(result);
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