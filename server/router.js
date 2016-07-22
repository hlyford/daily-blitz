var express = require('express');

var app = require('./server.js');
var quizController = require('./controllers/quizController');
var userController = require('./controllers/userController');
var rosterController = require('./controllers/rosterController');
var bodyParser = require('body-parser');
var path = require('path');

var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


// QUIZ ROUTES

// add back wild card route once have browserHistory working
// router.route('*')
// 	.get(function (req, res) {
// 		var stuff = path.resolve('client', 'index.html');
// 		res.sendFile(stuff);
// 	})

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
	.get(function (req, res) {
		userController.createUser(req.body, function (response) {
			res.send(response);
		})
	})

// ROSTER ROUTES
router.route('/roster')
	.get( function (req, res) {
		rosterController.getAllRosters(function (response) {
			res.send(response);
		})
	})
router.route('/roster/:team_acronym')
	.get(function (req, res) {
		console.log('here', req.params.team_acronym);
		rosterController.getRoster(req.params.team_acronym, function (roster_data) {
			res.send(roster_data);
		})
	})


module.exports = router;