const mongoose = require('mongoose');
const beautifyUnique = require("mongoose-beautiful-unique-validation");

const Notifications = new mongoose.Schema({
	accountId: {type: Number, unique: true, required: true,},
	name: {type: String},
	color: {type: String},

}, {timestamps: true});

Notifications.plugin(beautifyUnique);
module.exports = mongoose.model('Notifications', Notifications);
