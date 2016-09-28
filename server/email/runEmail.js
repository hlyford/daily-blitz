var emailSender = require('./emailSender');
var Promise = require('promise');
var userController = require('../controllers/userController');
var _ = require('underscore');

// get all users
var users = new Promise(function (resolve, reject) {
	if (resolve) resolve(userController.getUsers(1));
	else reject('sorry');
});

users.then( function(result) {
	toArray = result;
	toArray = _.pluck(toArray, 'email');
	var subject = 'Thanks for subscribing to RosterBlitz - hi Jake!';
	var quizUrl = 'http://www.rosterblitz.com/#/quiz?league=nba&quiz_id=gsw&_k=3mwx4u';
	var handleComplete = function (response) {
		console.log(response);
	}

	console.log('Running email...');
	emailSender(toArray, subject, quizUrl, handleComplete);
});

