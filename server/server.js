// required modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var twilio = require('./twilio/twilio');

// require in other files
var router = require('./router.js');

var port = process.env.PORT || 8000;
var app = express();

// set up MongoDB
var dbURI = process.env.MONGODB_URI || 'mongodb://localhost/obscore';
console.log(dbURI);
var db = mongoose.connect(dbURI);

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// serve up client side assets
app.use(express.static(path.join(__dirname, "../client")));

// redirect http requests to router
app.use('/', router);

// start the server
app.listen(port, function () {
	console.log('App running at: ' + port);
})

