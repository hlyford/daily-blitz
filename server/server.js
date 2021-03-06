// required modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var twilio = require('./twilio/twilio');
var responseTime = require('response-time');
var redisController = require('./jobs/redis/redisInserter');
// require in other files
var router = require('./router.js');

var port = process.env.PORT || 8000;
var app = express();

// set up MongoDB
var dbURI = process.env.MONGODB_URI || 'mongodb://localhost/obscore';

if (port !== 8000) {
	var newrelic = require('newrelic');
}

console.log(dbURI);
var db = mongoose.connect(dbURI);

// set up Redis
var redis = require('redis');
var client = redis.createClient(process.env.REDIS_URL);
client.on('connect', function() {
  console.log('Redis connected...');
  redisController.setClient(client);

});

// middleware
app.use(responseTime());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// serve up client side assets
app.use(express.static(path.join(__dirname, "../client")));

// redirect http requests to router
app.use('/', router);

// start the server
app.listen(port, function () {
	console.log('App running at: ' + port);
});

return;

