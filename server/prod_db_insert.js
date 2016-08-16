// required modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var rosterModel = require('./models/rosterModel');
var rosterController = require('./controllers/rosterController');
var mongoInserter = require('./controllers/mongoInserter');
// var scraper = require('./jobs/scraper/scraper');
// ----- CHANGE LEAGUE HERE -----
var allTeams = require('./jobs/scraper/allTeams.js').soccer;

// require in other files

var port = process.env.PORT || 8000;
var app = express();

// set up MongoDB
var dbURI = 'mongodb://heroku_rbb7779l:qu17dskjak3brt79onfnn2o8uh@ds017173.mlab.com:17173/heroku_rbb7779l';
// var dbURI = 'mongodb://localhost/obscore';
var db = mongoose.connect(dbURI);
console.log('MongoDB listening at: ' + dbURI);
mongoInserter.addStuff(allTeams);

// mongoInserter.getAllRosters( function (data) {
// 	// console.log('data', data[0]);
// 	rosterModel = require('./models/rosterModel');
// 	rosterController = require('./controllers/rosterController');
// 	mongoInserter = require('./controllers/mongoInserter');
// 	// var scraper = require('./jobs/scraper/scraper');

// 	localDbURI = 'mongodb://heroku_rbb7779l:qu17dskjak3brt79onfnn2o8uh@ds017173.mlab.com:17173/heroku_rbb7779l';
// 	localDb = mongoose.connect(localDbURI);
// 	console.log('and again ' + localDbURI);
// 	mongoInserter.addStuff(data);
// })
// var db = mongoose.connect(dbURI);

// console.log('MongoDB listening at: ' + dbURI);

// start the server
app.listen(port, function () {
	console.log('App running at: ' + port);
})