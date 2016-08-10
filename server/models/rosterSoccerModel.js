var mongoose = require('mongoose');

var RosterSoccerSchema = new mongoose.Schema({
	team_name: String,
	acronym: String,
	conference: String,
	players: Array,
	league: String,
	time: { type : Date, default: Date.now }
},
{collection: 'rosters_soccer'}
);

module.exports = mongoose.model('RosterSoccer', RosterSoccerSchema);