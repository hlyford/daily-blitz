var User = require('../models/userModel');
var validator = require('email-validator');

module.exports = {

	getOneUser: function (quiz_id, callback) {
		User.find({queryParam: quiz_id})
			.then(function (result) {
				callback(result);
			})
	},

	getUsers: function (onlyEmail) {
		var params = onlyEmail === 1 ? {email: 1} : {};
		return User.find({}, params, function (err, result) {
			if (err) return err;
			else {
				return result;
			}
		});
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