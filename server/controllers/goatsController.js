// SWITCH THE MODELS BELOW TO DETERMINE WHAT TEAM TO INSERT
var Goats = require('../models/goatsModel');

module.exports = {
	addStuff: function(data) {
		data.forEach(function(team, index) {
			Goats.find({title: team.title}).remove(function (err, result) {
			  if (err) console.log('error', err);
			  else {
			  	// console.log('removed', result.result);
			  	Goats.create({
			  		title: team.description,
			  		league: team.league,
			  		keywords: team.keywords,
			  		acronym: team.category,
			  		type: team.type,
			  		players: team.players
			  	}).then(function () {
			  		// console.log(team.title + ' added to db');
			  	});
			  }
			});
		})
		Goats.find({}).then(function(result){
			console.log('yo');
			console.log(result.length);
		})
	},
	findAll: function (callback) {
		Goats.find({}, function (err, result) {
		  if (err) console.log('error', err);
		  else {
		  	callback(result);
		  }
		});
	},
	findOne: function (arg, callback) {
		Goats.find({acronym: arg}, function (err, result) {
		  if (err) console.log('error', err);
		  else {
		  	callback(result);
		  }
		});
	}
}