var mongoose = require('mongoose');

var NbaPlayerSchema = new mongoose.Schema({
  team_name: String,
  acronym: String,
  conference: String,
  players: Array,
  league: String,
  time: { type : Date, default: Date.now }
},
{collection: 'nba_players'}
);

module.exports = mongoose.model('NbaPlayersStats', NbaPlayerSchema);