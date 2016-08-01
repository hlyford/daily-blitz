var mongoose = require('mongoose');

var RosterNflSchema = new mongoose.Schema({
	team_name: String,
	acronym: String,
	conference: String,
	players: Array,
	league: String,
	time: { type : Date, default: Date.now }
},
{collection: 'rosters_nfl'}
);

module.exports = mongoose.model('RosterNfl', RosterNflSchema);