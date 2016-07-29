var request = require('request');
var cheerio = require('cheerio');
var util = require('util');
// var Scraper = require("image-scraper");
var fs = require('fs');
var url = require('url');
var exec = require('child_process').exec;
var baseUrl = require('./url_info').baseUrl;
// var teamSlugs = require('./url-info').teamSlugs;
var rosterController = require('../../controllers/rosterController');
var teamsArray = require('./team_acronyms');
var Roster = require('../../models/rosterModel');


var getRosters = function (urlSlug, callback) {
	// initialize team object
	var team = {
		players: []
	};
	// form the url and go to the page
	var url = baseUrl + urlSlug + "/roster";
	request(url, function (error, response, html) {
	  if (!error && response.statusCode == 200) {
	  	// load the html for the page
			var $ = cheerio.load(html);

			// get the TEAM images and save them to the images directory
			// var teamImageUrl = $('.Row.ys-player-header .IbBox:nth-child(1)').css('background-image');
			// teamImageUrl = teamImageUrl.replace('url(','').replace(')','');
			// var dlDir = '/Users/honree/daily-blitz/server/team_logo_images/' + urlSlug.replace(/ /g,"_").replace(/\'/g, '') + '.png'; //+ '_'  + playerName.replace(/ /g,"_").replace(/\'/g, '') + '.png';
			// var curl =  'curl ' + teamImageUrl.replace(/&/g,'\\&') + ' -o ' + dlDir + ' --create-dirs';
			// var child = exec(curl, function(err, stdout, stderr) {
   //  		if (err){ console.log(stderr); throw err; }
   //  		else console.log(urlSlug + ' downloaded to ' + dlDir);
			// });
			// end team image adding

			// get the team name
			var teamName = $('.IbBox h1 span:nth-child(1)').text();
			team['team_name'] = teamName;
			var teamAcronym = urlSlug;
			team['acronym'] = teamAcronym;
			var league = 'nba';
			team['league'] = league;
			// get all the players info
			var rows = $('.ys-roster-table tbody tr');
			rows.each(function (i, element) {
				// if (i === 0) {
					var player = {};
					var playerNumber = $(element).find('td:nth-child(1)').text();
					player['player_number'] = playerNumber;
					// var player_image = $(element).find('td:nth-child(1)
					var name = $(element).find('td:nth-child(2) div div a').text();
					player['name'] = name;
					// var last_name
					var position = $(element).find('td:nth-child(3) div span:nth-child(1) span:nth-child(1)').text();
					player['position'] = position;
					var height = $(element).find('td:nth-child(4) span span').text();
					player['height'] = height;
					var weight = $(element).find('td:nth-child(5) span').text();
					player['weight'] = weight;
					var age = $(element).find('td:nth-child(6)').text();
					player['age'] = age;
					var experience = $(element).find('td:nth-child(7)').text();
					player['experience'] = experience;
					var birth_place = $(element).find('td:nth-child(8)').text();
					player['birth_place'] = birth_place;
					var college = $(element).find('td:nth-child(9)').text();
					player['college'] = college;
					// var salary = $(element).find('td:nth-child(10) span span');
					// player['salary'] = salary;
					for (key in player) {
						if (player[key] === '') {
							player[key] = 'Not available';
						}
					}
					team.players.push(player);
				// }
			});
		} else {
			console.log(error);
		}
		rosterController.addStuff(team);
	});
}
module.exports = getRosters;