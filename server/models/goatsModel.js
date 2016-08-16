var mongoose = require('mongoose');

var GoatsSchema = new mongoose.Schema({
	title: String,
	league: String,
	keywords: String,
	acronym: String,
	type: String,
	players: Array,
	time: { type : Date, default: Date.now }
});

module.exports = mongoose.model('Goats', GoatsSchema);