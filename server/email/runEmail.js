var emailSender = require('./emailSender');
var Promise = require('promise');
var userController = require('../controllers/userController');
var controllers = {
	'0': [require('../controllers/rosterController'), 'nba'],
	'1': [require('../controllers/rosterControllerNfl'), 'nfl'],
	'2': [require('../controllers/rosterControllerMlb'), 'mlb'],
	'3': [require('../controllers/rosterControllerSoccer'), 'soccer']
};
var _ = require('underscore');

module.exports = {
	// get all users
	runEmails: function(server) {

		var users = new Promise(function (resolve, reject) {
			if (resolve) resolve(userController.getUsers(1));
			else reject('sorry');
		});

		users.then( function(result) {

			toArray = result;
			toArray = _.pluck(toArray, 'email');
			var subject = 'Your daily RosterBlitz quiz';
			// select a quiz


			selectQuiz( function (teamInfo) {
				console.log('Running email...');
				emailSender(toArray, subject, teamInfo, function (response) {
					// close the server connection when it completes sending
					server.close(function() {
					  console.log("Closed out server connection.");
					  process.exit();
					});
				});
			});

		});

		function selectQuiz(callback) {
			var selection = Math.floor(Math.random() * (3 - 0)).toString();
			selectedController = controllers[selection][0], league = controllers[selection][1];
			// get a team from the controllers
			selectedController.getAllRosters(league, function(response) {
				var randomNumber = Math.floor(Math.random() * (response.length - 0));
				var teamAcronym = response[randomNumber].acronym, teamName = response[randomNumber].team_name;
				var quizUrl = `http://www.rosterblitz.com/#/quiz?league=${league}&quiz_id=${teamAcronym}`;
				callback({quizUrl: quizUrl, quiz_name: teamName});
				return;
			});
		}
	}


}