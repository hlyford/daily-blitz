var request = require('request');
var cheerio = require('cheerio');
var util = require('util');
var fs = require('fs');
var url = require('url');
var exec = require('child_process').exec;
var baseUrl = require('./url_info').baseUrl;
var baseBase = require('./url_info').baseBase;
var baseUrlNfl = require('./url_info').baseUrlNfl.toString();
// var teamSlugs = require('./url-info').teamSlugs;
var rosterControllerNfl = require('../../controllers/rosterControllerNfl');
var teamsArrayNfl = require('./team_acronyms').nfl;

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
	var url = baseUrlNfl + urlSlug + "/roster";
	request(url, function (error, response, html) {
		if (error) { console.log('error on html load!'); return; }
	  if (!error && response.statusCode == 200) {

			var $ = cheerio.load(html);
			// ****** get the TEAM images and save them to the images directory
			// var teamImageUrl = $('.Row.ys-player-header .IbBox:nth-child(1)').css('background-image');
			// teamImageGetter(teamImageUrl, urlSlug, 'nfl');
			// ******* end team image adding

			// get the team name
			var teamName = $('.IbBox h1 span:nth-child(1)').text();
			team['team_name'] = teamName;
			var teamAcronym = urlSlug;
			team['acronym'] = teamAcronym;
			var league = 'nfl';
			team['league'] = league;
			// get all the players info
			var rows = $('.ys-roster-table tbody tr');
			rows.each(function (i, element) {
				// if (i < 1) {
					var player = {};
					var playerNumber = $(element).find('td:nth-child(1)').text();
					player['player_number'] = playerNumber;
					var name = $(element).find('td:nth-child(2) div div a').text();
					player['name'] = name;
					var position = $(element).find('td:nth-child(3) div span:nth-child(1) span:nth-child(1)').text();
					player['position'] = position;

					// var salary = $(element).find('td:nth-child(10) span span').text();
					// console.log('sksary here, ' salary);
					// player['salary'] = salary;

					// **** get player images ***
					// get the thumbnail image -----
					if (process.argv[3] === 'img') {
						var thumbnailUrl = $(element).find('td:nth-child(2) div img').css('background-image');
						thumbnailUrl = thumbnailUrl.slice(4, thumbnailUrl.length - 1);
						thumbnail = baseBase + thumbnailUrl;
						playerImageGetter(thumbnailUrl, urlSlug, name);
						sleep(271);
					}
					// ------ end thumbnail getter

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
		if (process.argv[3] === 'img') { return;}
		// add back to get rosters
		rosterControllerNfl.addStuff(team);
	});
}
module.exports = getRosters;

function teamImageGetter (teamImageUrl, urlSlug, league) {
	teamImageUrl = teamImageUrl.replace('url(','').replace(')','');
	var dlDir = '/Users/honree/daily-blitz/server/images_server/team_logo_images/' + league + '_' + urlSlug.replace(/ /g,"_").replace(/\'/g, '') + '.png'; //+ '_'  + playerName.replace(/ /g,"_").replace(/\'/g, '') + '.png';
	var curl =  'curl ' + teamImageUrl.replace(/&/g,'\\&') + ' -o ' + dlDir + ' --create-dirs';
	var child = exec(curl, function(err, stdout, stderr) {
 		if (err){ console.log(stderr); throw err; }
 		else console.log(urlSlug + ' downloaded to ' + dlDir);
	});
}

function playerImageGetter (playerImageUrl, shortSlug, playerName) {
	// get the images and save them to the images directory
	var dlDir = '/Users/honree/daily-blitz/server/images_server/nfl_player_images/' + playerName.replace(/ /g,"_").replace(/\'/g, '') +'.png';
	var curl =  'curl ' + playerImageUrl.replace(/&/g,'\\&') + ' -o ' + dlDir  + ' --create-dirs';
	var child = exec(curl, function(err, stdout, stderr) {
		if (err){ console.log(stderr); throw err; }
		else console.log(playerName + ' downloaded to ' + dlDir);
	});
}