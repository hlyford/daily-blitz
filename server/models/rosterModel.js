var mongoose = require('mongoose');

var RosterSchema = new mongoose.Schema({
	team_name: String,
	acronym: String,
	conference: String,
	players: Array,
	time: { type : Date, default: Date.now }
});

module.exports = mongoose.model('Roster', RosterSchema);