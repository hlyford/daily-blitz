// required modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var rosterModel = require('./models/rosterModel');
var rosterController = require('./controllers/rosterController');
var emailRunner = require('./email/runEmail')

// var scraper = require('./jobs/scraper/scraper');
// ----- CHANGE LEAGUE HERE -----

// set up MongoDB
var dbURI = process.env.MONGODB_URI || 'mongodb://localhost/obscore';
var dbURI = 'mongodb://heroku_rbb7779l:qu17dskjak3brt79onfnn2o8uh@ds017173.mlab.com:17173/heroku_rbb7779l';
var db = mongoose.connect(dbURI);

// require in other files

var port = process.env.PORT || 8012;
var app = express();

// start the server
var server = app.listen(port, function () {
	console.log('App running at: ' + port);
});

emailRunner.runEmails(server);