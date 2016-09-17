var express = require('express');

var app = require('./server.js');
var quizController = require('./controllers/quizController');
var userController = require('./controllers/userController');
var rosterController = require('./controllers/rosterController');
var rosterControllerNfl = require('./controllers/rosterControllerNfl');
var rosterControllerMlb = require('./controllers/rosterControllerMlb');
var goatsController = require('./controllers/goatsController');
var rosterControllerSoccer = require('./controllers/rosterControllerSoccer');
var searchController = require('./controllers/searchController');
var bodyParser = require('body-parser');
var path = require('path');
// var emailSender = require('./email/emailSender');

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
router.route( '/quiz/:querySlug' ).get(function (req, res) {
	// send to quiz controller
	quizController.handleQuiz(req.params.querySlug, function (quiz_data) {
		res.send(quiz_data);
	});
});
router.route('/quiz').post(function (req, res) {
	quizController.createQuiz(req.body, function (response) {
		res.send(response);
	});
});

// USER ROUTES
router.route('/user').post(function (req, res) {
	userController.createUser(req.body, function (response) {
		res.send(response);
	});
});

// ROSTER ROUTES
// get all rosters for a given league
router.route('/roster/:league').get( function (req, res) {
	var league = req.params.league;
	switch (league) {
		case 'nba':
			rosterController.getAllRosters(league, function (response) {
				console.log(response);
				res.send(response);
			});
			break;
		case 'nfl':
			rosterControllerNfl.getAllRosters(league, function (response) {
				res.send(response);
			});
			break;
		case 'mlb':
			rosterControllerMlb.getAllRosters(league, function (response) {
				res.send(response);
			});
			break;
		case 'soccer':
			rosterControllerSoccer.getAllRosters(league, function (response) {
				res.send(response);
			});
			break;
	}
});
// get roster for a specific team
router.route('/roster/:league/team/:team_acronym').get(function (req, res) {
	var league = req.params.league;
	switch (league) {
		case 'nba':
			rosterController.getRoster(req.params.team_acronym, function (roster_data) {
				res.send(roster_data);
			})
			break;
		case 'nfl':
			rosterControllerNfl.getRoster(req.params.team_acronym, function (response) {
				res.send(response);
			});
			break;
		case 'mlb':
			rosterControllerMlb.getRoster(req.params.team_acronym, function (response) {
				res.send(response);
			});
		break;
		case 'soccer':
			rosterControllerSoccer.getRoster(req.params.team_acronym, function (response) {
				res.send(response);
			});
			break;
	}
});

// GOATS LISTS ROUTES
router.route('/lists').get( function (req, res) {
	goatsController.findAll(function (result) {
		res.send(result);
	});
});
router.route('/lists/:acronym').get( function (req, res) {
	goatsController.findOne(req.params.acronym, function (result) {
		res.send(result);
	});
});

// site wide search routes
router.route('/search').post(function (req, res) {
	searchController.find(req.body.query, function (result) {
		res.send(result);
	})
});
router.route('/search').get(function (req, res) {
	searchController.find('all', function (result) {
		res.send(result);
	})
});

// email sending routes
router.route('/hello').get( function (req, res) {
	emailSender(function (response) {
		res.send(response);
	});
});

// forwarding from rosterblitz 1.0 routes already SEO'd
router.route('/leaguesearch/:league').get(function (req, res) {
	switch (req.params.league) {
		case 'nba':
			res.writeHead(301,
			  {Location: '/#/rosters?league=' + req.params.league}
			);
			break;
		case 'nfl':
			res.writeHead(301,
			  {Location: '/#/rosters?league=' + req.params.league}
			);
			break;
		case 'mlb':
			res.writeHead(301,
			  {Location: '/#/rosters?league=' + req.params.league}
			);
		break;
		case 'soccer':
			res.writeHead(301,
			  {Location: '/#/rosters?league=' + req.params.league}
			);
			break;
	}
	res.end();
});

module.exports = router;