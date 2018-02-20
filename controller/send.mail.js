exports.sendMail = function(req, res){
	
	var nodemailer = require('nodemailer');
	var transporter = nodemailer.createTransport({
		host: 'smtp.sendgrid.net',
		port: 587,
		secure: false,
		auth: {
			user: 'apikey',
			pass: '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'
		}
	});
	var data = req.body;
	
	transporter.sendMail({
		from: 'darkk292@gmail.com',
		to: data.toEmail,
		subject: data.subject,
		text: data.mailMessage
	});	
	res.send(data);
};