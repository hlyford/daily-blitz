var mongoose = require('mongoose');

var RostersSchema = new mongoose.Schema({
 name: String,
 players: Array
 },
 {collection: 'rosters'}
);

module.exports = mongoose.model('Rosters', RostersSchema, 'Rosters');