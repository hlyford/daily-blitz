// required modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
// var run = require('./jobs/scraper/run');
var goatList = require('../lists/nba/import_nba');
var goatsController = require('./controllers/goatsController');
// require in other files

// pass the lists to the controller
goatsController.addStuff(goatList);

var port = process.env.PORT || 8000;
var app = express();

// set up MongoDB
var dbURI = process.env.MONGODB_URI || 'mongodb://localhost/obscore';

var db = mongoose.connect(dbURI);
console.log('MongoDB listening at: ' + dbURI);

// start the server
app.listen(port, function () {
	console.log('App running at: ' + port);
});