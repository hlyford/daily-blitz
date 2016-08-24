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
					// var smallImageUrl = $(element).find('td:nth-child(2) div img').attr('src');


					// BIG IMAGE GETTER
					var bigImageUrl = $(element).find('td:nth-child(2) div div a').attr('href');
					bigImageUrl = baseBase + bigImageUrl;
	  			request(bigImageUrl, function (error, response, html) {
	  				if (error) throw error;
		  			if (!error && response.statusCode == 200) {
		    			var $$ = cheerio.load(html);
		    			// check if there's a src for img
		    			var imgType = 'img';
		    			var playerPicUrl = $$('#Main').find('#mediasportsplayerheader .player-image');
		    			if (parseInt(playerPicUrl.children().length) === 0) {
		    				// make grey outline if no picture
		    				playerPicUrl = 'https://s.yimg.com/dh/ap/default/140828/silhouette@2x.png';
		    			} else {
		    				// else see if the img is on the src or the background-image
		    				playerPicUrl = playerPicUrl.find('img:first-of-type').attr('src');
		    				if (playerPicUrl.length < 80) {
		    					imgType = 'background';
		    					playerPicUrl = $$('#Main').find('#mediasportsplayerheader .player-image img:first-of-type').css('background-image');
		    					playerPicUrl = playerPicUrl.slice(4, playerPicUrl.length - 1);
		    				}
		    			}
		    			playerImageGetter(playerPicUrl, urlSlug, name);
		    			sleep(1421);
		    			return;
		    		}
		    	});
					// ----- end big image getter ----

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
		console.log('all palyers for '+team.team_name+' added.');
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
	// format player name
	function formatter (player) {
		// loop from the back of the player name looking for space and forming last name
		var lastName = '', firstName = ''; fullName = '';
		var nameSoFar = '';
		for (var i = 0; i < player.length; i++) {
			if (player[i] === '-') {
				firstName = nameSoFar;
				firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
				lastName = player.slice(i + 1);
				lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
				fullName = firstName + ' ' + lastName;
				return fullName;
			} else {
				nameSoFar += player[i];
			}
		}
	}
	if (playerName.indexOf('-') !== -1) {
		playerName = formatter(playerName);
	} else {
		playerName = playerName;
	}
	// get the images and save them to the images directory
	var dlDir = '/Users/honree/daily-blitz/server/images_server/soccer_player_images/' + playerName.replace(/ /g,"_").replace(/\'/g, '') +'.png';
	var curl =  'curl ' + playerImageUrl.replace(/&/g,'\\&') + ' -o ' + dlDir  + ' --create-dirs';
	var child = exec(curl, function(err, stdout, stderr) {
		if (err){ console.log(stderr); throw err; }
		else console.log(playerName + ' downloaded to ' + dlDir);
	});
	return;
}