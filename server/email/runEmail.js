var emailSender = require('./emailSender');
var Promise = require('promise');
var userController = require('../controllers/userController');

// get all users
// var users = new Promise(function (resolve, reject) {
//   userController.getUsers, function (err, res) {
//     if (err) {
//     	console.log('hihihih'); reject(err);
//     }
//     else {
//     	console.log('hihihih');
//     	resolve(res);
//     }
//   };
// });
userController.getUsers().then(function (reds) {
	console.log(reds);
})


console.log('users: ', users);
return;
var toArray = ['hlyford11@gmail.com', 'kelseyjgross@gmail.com'];
var subject = 'Thanks for subscribing to RosterBlitz!';
var quizUrl = 'http://www.rosterblitz.com/#/quiz?league=nba&quiz_id=gsw&_k=3mwx4u';
var handleComplete = function (response) {
	console.log(response);
}

console.log('Running email...');
emailSender(toArray, subject, quizUrl, handleComplete);