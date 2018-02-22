var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var core = require('./controller/send.mail');
var path = require('path');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('./public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.route('/mailForm').post(core.sendMail);

app.listen(3030);

console.log('server running at port 3030...');