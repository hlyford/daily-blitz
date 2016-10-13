var mongoose = require('mongoose');

var WarmingUpSchema = new mongoose.Schema({
	title: String,
	league: String,
	keywords: String,
	acronym: String,
	type: String,
	players: Array,
	time: { type : Date, default: Date.now }
},
{collection: 'warming_up'}
);

module.exports = mongoose.model('WarmingUp', WarmingUpSchema);