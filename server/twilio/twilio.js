var config = require('./config');

// var config = require('./config');
var client = require('twilio')(config.accountSid, config.authToken);

module.exports.sendSms = function(to, message) {
  client.messages.create({
    body: message,
    to: to,
    from: config.sendingNumber,
    // mediaUrl: 'https://goat-blitz.herokuapp.com/#/quiz?roster=1&quiz_id=gsw'
  }, function(err, data) {
    if (err) {
      console.error('Could not notify administrator');
      console.error(err);
    } else {
      console.log('Administrator notified');
    }
  });
};

module.exports.sendSms('19079478364', 'as a minority using Twilio [zoom out], it only took me 25 minutes [zoom in] to set up SMSing with my NodeJS app, try dis epic daily sports quiz that i can send until my twilio credit runs out: https://goat-blitz.herokuapp.com/#/quiz?roster=1&quiz_id=gsw');