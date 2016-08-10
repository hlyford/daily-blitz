var User = require('../models/userModel');
var validator = require('email-validator');

module.exports = {

	handleQuiz: function (quiz_id, callback) {
		User.find({queryParam: quiz_id})
			.then(function (result) {
				callback(result);
			})
	},

	createUser: function (data, callback) {
		// check if the email is valid
		if (!validator.validate(data.email)) {
			callback({err: 'Email not valid.' });
			return;
		} else {
			// check if we already have that email or password
			User.find({email: data.email}).then(function (response) {
				if (response.length > 0) {
					callback({err: 'We already have that email on file.'});
					return;
				} else {
					// call on the model to create the user
					User.create({
						email: data.email,
						phone_number: data.phone_number
					})
						.then(function(result) {
							callback(result);
						});
				}
			})
		}
	}
}