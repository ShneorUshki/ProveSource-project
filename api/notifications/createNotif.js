const Notifications = require("../../models/notifications/Notifications");
const express = require("express");
const router = express.Router();

router.post("/add-notifications", async (req, res) => {
  const { accountId, name, color } = req.body;
  console.log('accountId:', accountId)
  const notifications = new Notifications({ accountId, name, color });
  await notifications.save().then(() => {
	 res.send({ message: "success" });
    } 
  )
  .catch((err) =>{
	res.send({"error": err.message});
  })
  
});
module.exports = router;
