var mongoose = require('mongoose');

var RosterNbaSchema = new mongoose.Schema({
	team_name: String,
	acronym: String,
	conference: String,
	players: Array,
	league: String,
	time: { type : Date, default: Date.now }
},
{collection: 'rosters_nba'}
);

module.exports = mongoose.model('RosterNba', RosterNbaSchema);