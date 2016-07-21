var User = require('../models/userModel');

module.exports = {

	handleQuiz: function (quiz_id, callback) {
		User.find({queryParam: quiz_id})
			.then(function (result) {
				callback(result);
			})
	},

	createUser: function (data, callback) {
		// check if we already have that email or password
		console.log('controller', data);
			// call on the model to create the quiz
			User.create({
				email: data.email,
				phone_number: data.phone_number
			})
				.then(function(result) {
					callback(result);
				});
		}
}