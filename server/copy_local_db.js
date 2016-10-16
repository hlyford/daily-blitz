// required modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');

var allTeams = [];

var port = process.env.PORT || 8011;
var app = express();

// set up MongoDB
var dbURI = 'mongodb://localhost/obscore';
var db = mongoose.connect(dbURI);
console.log('MongoDB listening at: ' + dbURI);

var server = app.listen(port, function () {
	console.log('App running at: ' + port);
});

// require in all the leagues' controllers
var rosterNbaController = require('./controllers/rosterController');
var rosterNflController = require('./controllers/rosterControllerNfl');
var rosterMlbController = require('./controllers/rosterControllerMlb');
var rosterSoccerController = require('./controllers/rosterControllerSoccer');

rosterNbaController.getAllRostersInsert('nba', function(res) {
	allTeams.nba = res;
	writeTeams('nba', allTeams);
});
rosterNflController.getAllRostersInsert('nfl', function(res) {
	allTeams.nfl = res;
	writeTeams('nfl', allTeams);
});
rosterMlbController.getAllRostersInsert('mlb', function(res) {
	allTeams.mlb = res;
	writeTeams('mlb', allTeams);
});
rosterSoccerController.getAllRostersInsert('soccer', function(res) {
	allTeams.soccer = res;
	writeTeams('soccer', allTeams);
});

// ***** write to allTeams files by the league
function writeTeams(league, allTeams) {
	// console.log(allTeams.nba2);
	fs.writeFile("./allTeams/" + league +"_insert.js", 'module.exports = [' + allTeams[league] + ']', function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file for " + league + " was saved!");

    if (league === 'soccer') {
    	// close the server when done;
    	setTimeout(function() {
    		server.close(function() {
    	  console.log("Closed out server connection.");
    	  process.exit();
    		});
    	}, 8000);
    }
	});
}