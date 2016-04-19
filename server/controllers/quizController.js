var Quiz = require('../models/quizModel');

module.exports = {

	handleQuiz: function (quiz_id, callback) {
		Quiz.find() //({queryParam: quiz_id})
			.then(function (result) {
				console.log('result here ',result );
			})
	}

}