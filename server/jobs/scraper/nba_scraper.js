var request = require('request');
var cheerio = require('cheerio');
var util = require('util');
// var Scraper = require("image-scraper");
var fs = require('fs');
var url = require('url');
var exec = require('child_process').exec;
var baseUrl = require('./url_info').baseUrl;
var baseBase = require('./url_info').baseBase;
// var teamSlugs = require('./url-info').teamSlugs;
var rosterController = require('../../controllers/rosterController');
var teamsArray = require('./team_acronyms');
var Roster = require('../../models/rosterModel');

// pause between players
function sleep(miliseconds) {
	console.log('sleeping for ' + miliseconds);
   var currentTime = new Date().getTime();
   while (currentTime + miliseconds >= new Date().getTime()) {
   }
   console.log('resume');
}


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

			// ****** get the TEAM images and save them to the images directory
			// var teamImageUrl = $('.Row.ys-player-header .IbBox:nth-child(1)').css('background-image');
			// teamImageGetter(teamImageUrl, urlSlug);
			// ******* end team image adding

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

				// if (i > 9 && i < 31) {  // comment out when want to get all players
					var player = {};
					var playerNumber = $(element).find('td:nth-child(1)').text();
					player['player_number'] = playerNumber;
					var name = $(element).find('td:nth-child(2) div div a').text();
					player['name'] = name;
					var position = $(element).find('td:nth-child(3) div span:nth-child(1)').text().replace(/\//g, "");
					player['position'] = position;

					// var salary = $(element).find('td:nth-child(10) span span').text();
					// console.log('sksary here, ' salary);
					// player['salary'] = salary;

					// **** get player images ***
					// SMALL PLAYER IMAGE URL
					if (process.argv[3] === 'img') {
						var smallImageUrl = $(element).find('td:nth-child(2) div img').attr('src');
	     			// check if there's a src for img
	    			var imgType = 'img';
	    			if (smallImageUrl === 'https://s.yimg.com/g/images/spaceball.gif') {
	    				smallImageUrl = $(element).find('td:nth-child(2) div img').css('background-image');
	    				smallImageUrl = smallImageUrl.slice(4, smallImageUrl.length - 1);
	    			}

	    			var playerPicUrl = smallImageUrl;
	    			if (parseInt(smallImageUrl.length) < 80) {
	    				// make grey outline if no picture
	    				playerPicUrl = 'https://s.yimg.com/dh/ap/default/140828/silhouette@2x.png';
	    			}
	    				// else see if the img is on the src or the background-image
	    			playerImageGetter(playerPicUrl, urlSlug, name);
	    			sleep(3421);
    				return;
    			}
					// END SMALL PLAYER URL

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
		// console.log('all player images for ' + team.team_name + ' added.'); return;
		// add back to get rosters
		if (process.argv[3] === 'img') { return;}
		rosterController.addStuff(team);
	});
}
module.exports = getRosters;

function teamImageGetter (teamImageUrl, urlSlug) {
	teamImageUrl = teamImageUrl.replace('url(','').replace(')','');
	var dlDir = '/Users/honree/daily-blitz/server/images_server/team_logo_images/' + urlSlug.replace(/ /g,"_").replace(/\'/g, '') + '.png'; //+ '_'  + playerName.replace(/ /g,"_").replace(/\'/g, '') + '.png';
	var curl =  'curl ' + teamImageUrl.replace(/&/g,'\\&') + ' -o ' + dlDir + ' --create-dirs';
	var child = exec(curl, function(err, stdout, stderr) {
 		if (err){ console.log(stderr); throw err; }
 		else console.log(urlSlug + ' downloaded to ' + dlDir);
	});
}

function playerImageGetter (playerImageUrl, shortSlug, playerName) {
	// get the images and save them to the images directory
	var dlDir = '/Users/honree/daily-blitz/server/images_server/nba_player_images/' + playerName.replace(/ /g,"_").replace(/\'/g, '') +'.png';
	var curl =  'curl ' + playerImageUrl.replace(/&/g,'\\&') + ' -o ' + dlDir  + ' --create-dirs';
	var child = exec(curl, function(err, stdout, stderr) {
		if (err){ console.log(stderr); throw err; }
		else console.log(playerName + ' downloaded to ' + dlDir);
	});
}