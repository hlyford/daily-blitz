// required modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var rosterModel = require('./models/rosterModel');
var mongoInserter = require('./controllers/mongoInserter');
var fs = require('fs');
// var scraper = require('./jobs/scraper/scraper');
// ----- CHANGE LEAGUE HERE -----
var allTeams = require('./jobs/scraper/allTeams.js');

var port = process.env.PORT || 8011;
var app = express();

// set up MongoDB

var dbURI = 'mongodb://localhost/obscore';
var db = mongoose.connect(dbURI);
console.log('MongoDB listening at: ' + dbURI);

// require in all the leagues' controllers
var rosterNbaController = require('./controllers/rosterController');
// do get allAllRosters for each league
// set as variables (arrays)
// remove the _id field
rosterNbaController.getAllRostersInsert('nba', function(res) {
	allTeams['nba2'] = res;
	writeTeams(allTeams);
});

// ***** write to allTeams files by the league
function writeTeams(allTeams) {
	console.log(allTeams.nba2);
	fs.writeFile("./test.js", 'module.exports = {' + '"nba":' + allTeams['nba2'] + '}' , function(err) {
	    if(err) {
	        return console.log(err);
	    }
	    console.log("The file was saved!");
	});
}