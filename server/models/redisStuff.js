var redisStuff = function(client) {
	client.set('framework', 'AngularJS', function(err, reply) {
  	client.get('framework', function (err, reply) {
  		console.log('here' , reply);
  	});
	});
};

module.exports = redisStuff;