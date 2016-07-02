var express = require('express');

var app = require('./server.js');
var quizController = require('./controllers/quizController');
var userController = require('./controllers/userController');
var bodyParser = require('body-parser');

var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));  

// QUIZ ROUTES
router.route( '/quiz/:querySlug' )
	.get(function (req, res) {
		// send to quiz controller
		quizController.handleQuiz(req.params.querySlug, function (quiz_data) {									
			res.send(quiz_data);
		})		
	})
router.route('/quiz')
	.post(function (req, res) {		
		quizController.createQuiz(req.body, function (response) {						
			res.send(response);
		});
	})

// USER ROUTES
router.route('/user')
	.post(function (req, res) {
		userController.createUser(req.body, function (response) {
			res.send(response);
		})
	})


module.exports = router;