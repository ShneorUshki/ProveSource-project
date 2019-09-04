const Account = require('../../models/account/Account');

module.exports = async function(req, res, next) {
	if (req.method !== "POST") {
		return res.send({"error": "Only POST requests are possible!"})
	}
	const {email, name, age} = req.body;
	const account = new Account({email, name, age});
	await account.save();
	return res.send({message: 'success'});
};