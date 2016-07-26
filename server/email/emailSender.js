var nodemailer = require('nodemailer');
var config = require('./config');
var rbEmail = config.email, pw = config.pw;
 // handle the route at yourdomain.com/sayHello

 module.exports = function (callback) {
     var mailOptions = {
         from: 'rosterblitz@gmail.com', // sender address
         to: 'hlyford11@gmail.com', // list of receivers
         subject: 'Email Example', // Subject line
         // text: text //, // plaintext body
         html: '<div>Maybe you try dis quiz</div><ul><li><a href="http://rosterquiz.com">RosterQuiz</a></li></ul>' // You can choose to send an HTML body instead
     };

     var handleSayHello = function (req, res) {
         // Not the movie transporter!
         var transporter = nodemailer.createTransport({
             service: 'Gmail',
             auth: {
                 user: rbEmail, // Your email id
                 pass: pw // Your password
             }
         });
         return transporter;
     };
     var sendMail = function (t) {
        console.log('hihh');
        t.sendMail(mailOptions, function(error, info){
            console.log('hi', transporter);
             if(error){
                 console.log(error);
                 // res.json({yo: 'error'});
             }else{
                 console.log('Message sent: ' + info.response);
                 callback(info.response);
             };
        });
    }
    var transporter = handleSayHello();
    sendMail(transporter);
}