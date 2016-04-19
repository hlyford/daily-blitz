var mongoose = require('mongoose');

var QuizzesSchema = new mongoose.Schema({
 title: String,
 players: Array,
 queryParam: String
 },
 {collection: 'lists'}
);

module.exports = mongoose.model('Quiz', QuizzesSchema);