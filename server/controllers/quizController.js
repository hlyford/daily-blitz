var Quiz = require('../models/quizModel');

module.exports = {

	handleQuiz: function (quiz_id, callback) {		
		// get all quizzes or get an individual quiz
		if (quiz_id === 'all') {
			console.log('hi');
			Quiz.find()
				.then(function (result) {
					callback(result);
				})
		}	else {
			Quiz.find({queryParam: quiz_id})
				.then(function (result) {
					callback(result);
				})
		}
	},

	createQuiz: function (data, callback) {
		// check the password
		if (data.password !== 'goat69') {			
			callback('wrong password trick');
			return;
		} else {
			// make players array
			var playersArray = [];
			for (player in data.players) {
				playersArray.push(data.players[player]);
			}			
			// call on the model to create the quiz
			Quiz.create({
				title: data.quiz_name,
				queryParam: data.quiz_id,
				players: playersArray
			})
				.then(function(result) {					
					callback(result);
				});
		}
	}
}