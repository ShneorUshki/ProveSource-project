const express = require('express');
const mongoose = require('mongoose');
const account = require('./api/account/create')
const notifications = require('./api/notifications/createNotif')
const port = 3000

mongoose.connect('mongodb://127.0.0.1:27017/codeTest', {
	autoReconnect: true,
	reconnectTries: 60,
	reconnectInterval: 10000
});

const app = express();

app.use(require('body-parser').json());

app.use('/account/create', account);
app.use('/notifications', notifications);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;
