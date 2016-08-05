var mongoose = require('mongoose');

var RosterMlbSchema = new mongoose.Schema({
	team_name: String,
	acronym: String,
	conference: String,
	players: Array,
	league: String,
	time: { type : Date, default: Date.now }
},
{collection: 'rosters_mlb'}
);

module.exports = mongoose.model('RosterMlb', RosterMlbSchema);