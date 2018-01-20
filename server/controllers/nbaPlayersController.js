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
      allPlayers = [];
      // Loop through all teams
      for (var i = 0; i < result.length; i++) {
        // Loop through all players on team and add to array of players
        var team = result[i]
        for (var j = 0; j < team.players.length; j++) {
          allPlayers.push(team.players[j]);
        }
      }
      callback(allPlayers);
    });
  },

  getLeagueLeadersList: function(league, list, listLength = 10, callback) {
    this.getAllPlayers(league, function(allPlayers) {
      // Sort the list by the type of stat provided
      var sortBy = list;
      allPlayers.sort(function compare(a,b) {
        if (parseFloat(a[sortBy]) > parseFloat(b[sortBy]))
          return -1;
        if (parseFloat(a[sortBy]) < parseFloat(b[sortBy]))
          return 1;
        return 0;
      })
      // Send top ten
      callback(allPlayers.slice(0, listLength));
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