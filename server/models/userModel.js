var mongoose = require('mongoose');

var UsersSchema = new mongoose.Schema({ 
 email: String,
 phone_number: String
 },
 {collection: 'users'}
);

module.exports = mongoose.model('User', UsersSchema);