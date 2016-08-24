var Fuse = require('fuse.js');
// require in all models
var Roster = require('../models/rosterModel');
var RosterNfl = require('../models/rosterNflModel');
var RosterMlb = require('../models/rosterMlbModel');
var RosterSoccer = require('../models/rosterSoccerModel');
// get all data in memory when server starts
allData = [];
(function getAllData () {
	Roster.find({}, function (err, result) {
  	if (err) console.log('error',err);
	  result.forEach(function (item, index) {
	  	allData.push(item);
	  });
	});
	RosterNfl.find({}, function (err, result) {
  	if (err) console.log('error',err);
	  result.forEach(function (item, index) {
	  	allData.push(item);
	  });
	});
	RosterMlb.find({}, function (err, result) {
  	if (err) console.log('error',err);
	  result.forEach(function (item, index) {
	  	allData.push(item);
	  });
	});
	RosterSoccer.find({}, function (err, result) {
  	if (err) console.log('error',err);
	  result.forEach(function (item, index) {
	  	allData.push(item);
	  });
	});
})();
// when query comes in, search and return
module.exports = {
	find: function (query, callback) {
		console.log(query);
		var options = {
		  keys: ['team_name'],
		  id: 'team_name'
		}
		// allData = [{team_name: 'warriors'}];
		var fuse = new Fuse(allData, options)

		callback(fuse.search(query));
	}
}