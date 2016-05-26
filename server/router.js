var express = require('express');

var app = require('./server.js');
var quizController = require('./controllers/quizController');

var router = express.Router();

router.route( '/quiz/:querySlug' )
	.get(function (req, res) {
		// send to quiz controller
		quizController.handleQuiz(req.params.querySlug, function (quiz_data) {			
			res.send(quiz_data);
		})
		
	});


module.exports = router;