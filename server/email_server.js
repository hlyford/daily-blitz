// required modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var rosterModel = require('./models/rosterModel');
var rosterController = require('./controllers/rosterController');

// var scraper = require('./jobs/scraper/scraper');
// ----- CHANGE LEAGUE HERE -----

// set up MongoDB
var dbURI = process.env.MONGODB_URI || 'mongodb://localhost/obscore';
var db = mongoose.connect(dbURI);

var emailRunner = require('./email/runEmail');

// require in other files

var port = process.env.PORT || 8012;
var app = express();

// start the server
app.listen(port, function () {
	console.log('App running at: ' + port);
})

