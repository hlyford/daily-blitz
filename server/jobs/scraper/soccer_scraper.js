var request = require('request');
var cheerio = require('cheerio');
var util = require('util');
var fs = require('fs');
var url = require('url');
var exec = require('child_process').exec;
var baseBase = require('./url_info').baseBase;
var baseUrlSoccer = require('./url_info').baseUrlSoccer;
var rosterControllerSoccer = require('../../controllers/rosterControllerSoccer');

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
	var url = baseUrlSoccer + urlSlug + "/roster";
	request(url, function (error, response, html) {
		if (error) { console.log('error on html load!'); return; }
	  if (!error && response.statusCode == 200) {
			var $ = cheerio.load(html);
			// ****** get the TEAM images and save them to the images directory
			// var teamImageUrl = $('.Row.ys-player-header .IbBox:nth-child(1)').css('background-image');
			// teamImageGetter(teamImageUrl, urlSlug, 'soccer');
			// ******* end team image adding

			// **** CHNAGE SOCCER LEAGUE HERE ****
			var conference = 'epl';
			team['conference'] = conference;
			// get the team name
			var teamName = $('.IbBox h1 span:nth-child(1)').text();
			team['team_name'] = teamName;
			var teamAcronym = urlSlug;
			team['acronym'] = teamAcronym;
			var league = 'soccer';
			team['league'] = league;
			// get all the players info
			var rows = $('.ys-roster-table tbody tr');
			rows.each(function (i, element) {
				// if (i < 1) {   // get just one player for testing
					var player = {};
					var playerNumber = $(element).find('td:nth-child(1)').text();
					player['player_number'] = playerNumber;
					// pull name from url
					var nameHref = $(element).find('td:nth-child(2) div div a').attr('href');
					var name = '';
					for (var p = nameHref.length - 1; p > 0; p--) {
						if (nameHref[p] === '/') {
							name = name.split('').reverse().join('');
							break;
						} else {
							name += nameHref[p];						}
					}
					player['name'] = name;

					var position = $(element).find('td:nth-child(3) div span:nth-child(1) span:nth-child(1)').text();
					player['position'] = position;

					var height = $(element).find('td:nth-child(4) span span').text();
					player['height'] = height;
					var weight = $(element).find('td:nth-child(5) span').text();
					player['weight'] = weight;
					var age = $(element).find('td:nth-child(6)').text();
					player['age'] = age;
					// var experience = $(element).find('td:nth-child(7)').text();
					// player['experience'] = experience;
					var birth_place = $(element).find('td:nth-child(7)').text();
					player['birth_place'] = birth_place;
					// var college = $(element).find('td:nth-child(9)').text();
					// player['college'] = college;
					// var salary = $(element).find('td:nth-child(10) span span');
					// player['salary'] = salary;

					// PLAYER IMAGE URL
					var smallImageUrl = $(element).find('td:nth-child(2) div img').attr('src');

		   //  			// check if there's a src for img
		    			var imgType = 'img';
		    			if (smallImageUrl === 'https://s.yimg.com/g/images/spaceball.gif') {
		    				smallImageUrl = $(element).find('td:nth-child(2) div img').css('background-image');
		    				smallImageUrl = smallImageUrl.slice(4, smallImageUrl.length - 1);
		    			}

		    			var playerPicUrl = smallImageUrl;
		    			if (parseInt(smallImageUrl.length) < 80) {
		    				// make grey outline if no picture
		    				playerPicUrl = 'http://www.clker.com/cliparts/m/3/I/C/c/2/grey-silhouette-of-man-md.png';
		    			}
		    				// else see if the img is on the src or the background-image
		    			sleep(2431);
		    			playerImageGetter(playerPicUrl, urlSlug, name);
		    			return;

					// END PLAYER URL

					for (key in player) {
						if (player[key] === '') {
							player[key] = 'Not available';
						}
					}
					team.players.push(player);
				// } // comment out this one to get all players
			});
		} else {
			console.log(error);
		}
		// add back to get rosters
		return;
		rosterControllerSoccer.addStuff(team);
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
	var dlDir = '/Users/honree/daily-blitz/server/images_server/soccer_player_images/' + playerName.replace(/ /g,"_").replace(/\'/g, '') +'.png';
	var curl =  'curl ' + playerImageUrl.replace(/&/g,'\\&') + ' -o ' + dlDir  + ' --create-dirs';
	var child = exec(curl, function(err, stdout, stderr) {
		if (err){ console.log(stderr); throw err; }
		else console.log(playerName + ' downloaded to ' + dlDir);
	});
}