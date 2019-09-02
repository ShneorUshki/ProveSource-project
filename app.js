const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/codeTest', {
	autoReconnect: true,
	reconnectTries: 60,
	reconnectInterval: 10000
});

const app = express();
app.listen(3000);

app.use(require('body-parser').json());

app.use('/account/create', require('./api/account/create'));

console.log('app running on port 3000...');

module.exports = app;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 
	const Account = require('./models/account/Account.js');
	
	  app.post('/adduser', function (req, res) {
		let {email,name,age} = req.body

		let user = new Account(
			{email,name,age})

			user.save(function(err) {
				if (err) {
				  if (err.name === 'MongoError' && err.code === 11000) {
					
					return res.status(422).send(
						{"error": "email already exists"});
					 }}
			
				res.json({
				  success: true
				});
			
			  });
			})
});
