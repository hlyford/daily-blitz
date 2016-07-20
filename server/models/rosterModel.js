var mongoose = require('mongoose');

var RostersSchema = new mongoose.Schema({
 name: String,
 players: Array,
 acronym: String,
 conference: String
 },
 {collection: 'rosters'}
);

module.exports = mongoose.model('Roster', RostersSchema, 'Roster');