var Quiz = require('../models/quizModel');

module.exports = {

	handleQuiz: function (quiz_id, callback) {
		Quiz.find() //({queryParam: quiz_id})
			.then(function (result) {
				callback(result);
			})
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
			console.log('array', playersArray);

			Quiz.create({
				title: data.quiz_name,
				queryParam: data.quiz_id,
				players: playersArray
			})
				.then(function(result) {
					console.log(result);
					callback(result);
				});
		}
	}
}