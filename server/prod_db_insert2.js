// required modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var rosterModel = require('./models/rosterModel');
var rosterController = require('./controllers/rosterController');
var mongoInserter = require('./controllers/mongoInserter');

var redis = require('redis');
var redisInserter = require('./jobs/redis/redisInserter.js').insert;

// ----- CHANGE LEAGUE HERE -----
var league = process.argv[2];

var allTeams = {
	nba: require('../allTeams/nba_insert'),
	nfl: require('../allTeams/nfl_insert'),
	mlb: require('../allTeams/mlb_insert'),
	soccer: require('../allTeams/soccer_insert')
};

// require in other files

var port = process.env.PORT || 8010;
var app = express();
var server = app.listen(port);

if (process.argv[2] !== 'redis') {
	// set up MongoDB
	var dbURI = 'mongodb://heroku_rbb7779l:qu17dskjak3brt79onfnn2o8uh@ds017173.mlab.com:17173/heroku_rbb7779l';
	// var dbURI = 'mongodb://localhost/obscore';
	var db = mongoose.connect(dbURI);
	console.log('MongoDB listening at: ' + dbURI);
	// insert all the leagues or just one
	if (league === 'all') {
		for (var sport in allTeams) {
			mongoInserter.addStuff(sport, allTeams[sport], server);
		}
	} else {
		mongoInserter.addStuff(league, allTeams[league], server);
	}
}

// redis insert if argument provided
if (process.argv[2] === 'redis') {
	console.log('Running redis insert...');
	if (process.argv[3] === 'prod') {
		var client = redis.createClient('redis://h:pa9igs3tc3moh26cdkoukolbsnk@ec2-50-17-255-132.compute-1.amazonaws.com:7199');
	} else {
		var client = redis.createClient(process.env.REDIS_URL);
	}
	client.on('connect', function() {
	  console.log('Redis connected...');
	  redisInserter(client);
	});
}
