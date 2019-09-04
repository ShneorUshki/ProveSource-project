const mongoose = require('mongoose');
const beautifyUnique = require("mongoose-beautiful-unique-validation");

const Account = new mongoose.Schema({
	email: {type: String, required: true, unique: true},
	name: {type: String},
	age: {type: Number},

}, {timestamps: true});

Account.plugin(beautifyUnique);
module.exports = mongoose.model('Account', Account);
