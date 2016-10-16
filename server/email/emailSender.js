var nodemailer = require('nodemailer');
var config = require('./config');
var rbEmail = config.email, pw = config.pw;
 // handle the route at yourdomain.com/sayHello

 module.exports = function (toArray, subject, quiz_info, callback) {
    console.log('Sending to: ', toArray);
     var mailOptions = {
         from: 'rosterblitz@gmail.com', // sender address
         bcc: toArray, // list of receivers
         subject: subject, // Subject line
         // text: text //, // plaintext body
         html: `<div>Maybe you try dis quiz: <a href="${quiz_info.quizUrl}">${quiz_info.quiz_name}</a></div>` // You can choose to send an HTML body instead
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
     var sendMail = function (t, callback) {
        t.sendMail(mailOptions, function(error, info){
             if(error){
                 callback('Error: ', error);
             } else {
                 callback('Message sent: ' + info.response);
             }
        });
        return;
    };
    var transporter = handleSayHello();

    sendMail(transporter, function (result) {
        console.log('Mail sent.');
        callback();
    });
};