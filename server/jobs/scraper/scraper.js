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
			// get the team name
			var teamName = $('.IbBox h1 span:nth-child(1)').text();
			team['team_name'] = teamName;
			var teamAcronym = urlSlug;
			team['acronym'] = teamAcronym;

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

// loop through waiting 60 seconds each time
// var looper = function (i) {
// 	if (i < 30) {
// 		getRosters(teamsArray[i], function(teamData) {
// 			// add the conference
// 			teamData.conference = 'western';
// 			// add new file under the team acronym
// 			var dir = './teams/' + teamData.acronym +'.js';
// 			var asString = util.inspect(teamData);
// 			console.log(asString);
// 			fs.writeFile(dir, asString, function(err) {
// 			    if(err) {
// 			        return console.log(err);
// 			    }
// 			    console.log("The file was saved!");
// 			});
// 		});
// 	}
// 	setTimeout(function () {
// 		looper(i + 1);
// 	}, 60000);
// };

// looper(3);


