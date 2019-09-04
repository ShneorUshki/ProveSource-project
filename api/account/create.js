const Account = require('../../models/account/Account');
const express = require('express');
const router = express.Router();

const useOnlyPost = function (req, res, next) {
	if (req.method !== "POST") {
		return res.send({"error": "Only POST requests are possible!"})
	}
	next();
  };
router.use(useOnlyPost);

router.all('/new-account', async (req, res) => {
	const {email, name, age} = req.body;
	const account = new Account({email, name, age});
	await account.save(err => {
		if (err) {
			if (err.errors.email.properties.type === 'unique') 
				res.send({"error": "email already exists"});
		} else
			res.send({message: 'success'});
		
	});
});
module.exports = router;