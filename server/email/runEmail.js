var emailSender = require('./emailSender');

var toArray = ['hlyford11@gmail.com', 'kelseyjgross@gmail.com'];
var subject = 'Thanks for subscribing to RosterBlitz!';
var quizUrl = 'http://www.rosterblitz.com/#/quiz?league=nba&quiz_id=gsw&_k=3mwx4u';
var handleComplete = function (response) {
	console.log(response);
}

console.log('Running email...');
emailSender(toArray, subject, quizUrl, handleComplete);