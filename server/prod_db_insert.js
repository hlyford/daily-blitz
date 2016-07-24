// required modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var rosterModel = require('./models/rosterModel');
var rosterController = require('./controllers/rosterController');
var rosterController = require('./controllers/mongoInserter');
// var scraper = require('./jobs/scraper/scraper');
var allTeams = require('./jobs/scraper/allTeams.js');

// require in other files

var port = process.env.PORT || 8000;
var app = express();

// set up MongoDB
// var dbURI = process.env.MONGODB_URI || 'mongodb://localhost/obscore';
var dbURI = 'mongodb://heroku_rbb7779l:qu17dskjak3brt79onfnn2o8uh@ds017173.mlab.com:17173/heroku_rbb7779l';
var db = mongoose.connect(dbURI);

console.log('MongoDB listening at: ' + dbURI);

// start the server
app.listen(port, function () {
	console.log('App running at: ' + port);
})