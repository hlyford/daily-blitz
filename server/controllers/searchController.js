var Fuse = require('fuse.js');
// require in all models
var Roster = require('../models/rosterModel');
var RosterNfl = require('../models/rosterNflModel');
var RosterMlb = require('../models/rosterMlbModel');
var RosterSoccer = require('../models/rosterSoccerModel');
// get all data in memory when server starts
allData = [];
(function getAllData () {
	Roster.find({},{players: 0},  function (err, result) {
  	if (err) console.log('error',err);
	  result.forEach(function (item, index) {
	  	allData.push(item);
	  });
	});
	RosterNfl.find({},{players: 0},  function (err, result) {
  	if (err) console.log('error',err);
	  result.forEach(function (item, index) {
	  	allData.push(item);
	  });
	});
	RosterMlb.find({},{players: 0},  function (err, result) {
  	if (err) console.log('error',err);
	  result.forEach(function (item, index) {
	  	allData.push(item);
	  });
	});
	RosterSoccer.find({},{players: 0},  function (err, result) {
  	if (err) console.log('error',err);
	  result.forEach(function (item, index) {
	  	allData.push(result[index]);
	  });
	});
})();
// when query comes in, search and return
module.exports = {
	find: function (query, callback) {
		var options = {
		  keys: ['team_name'],
		  include: ['team_name', 'acroynm' ]
		}
		var fuse = new Fuse(allData, options)
		// only send back one team if exact match
		var results = fuse.search(query);
		if (query.length > 5 && results[0].item.team_name.toLowerCase().indexOf(query.toLowerCase())) {
			callback([results[0]]);
		} else {
			callback(results);
		}
		return;
	}
}