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

module.exports.sendSms(NUMBERS, 'GREAT JERB');