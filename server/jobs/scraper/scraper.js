var request = require('request');
var cheerio = require('cheerio');
// var Scraper = require("image-scraper");
var fs = require('fs');
var url = require('url');
var exec = require('child_process').exec;
var baseUrl = require('./url_info').baseUrl;
// var teamSlugs = require('./url-info').teamSlugs;
var rosterController = require('./rosterController');

var team = {
	players: []
};

var getRosters = function (urlSlug, callback) {
	var url = baseUrl + urlSlug + "/roster";
	request(url, function (error, response, html) {
	  if (!error && response.statusCode == 200) {
	  	// load the html for the page
			var $ = cheerio.load(html);
			// get the team name
			var teamName = $('.IbBox h1 span:nth-child(1)').text();
			team['name'] = teamName;

			// get all the players info
			var rows = $('.ys-roster-table tbody tr');
			rows.each(function (i, element) {
				if (i === 0) {
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
				}
			});
		} else {
			console.log(error);
		}
		callback(team);
	});
}
// call the function with the slug
// getRosters('gsw', function(teamData) {
// 	rosterController.addRoster(teamData, function (result) {
// 		console.log('hi', result);
// 	})
// });
console.log(baseUrl);
var teamData = {name: 'henrys', players: ['james']};
rosterController.addRoster(teamData, function (result) {
	console.log('hi', result);
})

var getPlayers = function(urlSlug, callback) {
  var shortSlug = urlSlug.slice(0, 3);
  request(baseUrl + urlSlug, function (error, response, html) {
	  if (!error && response.statusCode == 200) {
	  	// load the html for the page
			var $ = cheerio.load(html);
			$('.sortcell').each(function(i, element){
				// pull out the player's name based on the DOM
  			var playerName = $(element).first().text();
  			var $a = $(element).find('a');
  			var playerUrl = $a.attr('href');
  			// for each player, make a second request using cheerio; new page is href for player image
  			request(playerUrl, function (error, response, html) {
  				if (error) throw error;
	  			if (!error && response.statusCode == 200) {
	    			var $$ = cheerio.load(html);
	    			var playerPicUrl = $$('.main-headshot').find('img').attr('src');
	    			if (playerPicUrl !== undefined) {
		    			playerList.push({name: playerName, imageUrl: playerPicUrl});
		    			// get the images and save them to the images directory
		    			var dlDir = './images/' + shortSlug + '/'  + playerName.replace(/ /g,"_").replace(/\'/g, '') + '.png';
	      			var curl =  'curl ' + playerPicUrl.replace(/&/g,'\\&') + ' -o ' + dlDir  + ' --create-dirs';
	      			var child = exec(curl, function(err, stdout, stderr) {
	          		if (err){ console.log(stderr); throw err; }
	          		else console.log(playerName + ' downloaded to ' + dlDir);
	      			});
	      		}
	  			}
				});
			});
	  }
	});
}


// for (var i = 0; i < teamSlugs.length; i++) {
// 	getPlayers(teamSlugs[i]);
// }