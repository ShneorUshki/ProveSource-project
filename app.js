const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://127.0.0.1:27017/codeTest",
  {
    autoReconnect: true,
    reconnectTries: 60,
    reconnectInterval: 10000
  }
);

const app = express();
app.listen(3000);

app.use(require("body-parser").json());

app.use("/account/create", require("./api/account/create"));

console.log("app running on port 3000...");

module.exports = app;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  const Account = require("./models/account/Account.js");

  app.post("/addclient", async (req, res) => {
    let { email, name, age } = req.body;

    let client = new Account({ email, name, age });

    await client.save(err => {
      if (err) {
        if (err.name === "MongoError" && err.code === 11000) {
          return res.send({ error: "email already exists" });
        }
      }

      res.json({ success: true });
    });
  });

  const User = require("./models/users/user.js");
  app.post("/adduser", async (req, res) => {
    let { accountId, name, color } = req.body;

    let user = new User({ accountId, name, color });

    await user.save(err => {
      if (err) {
        if (err.errors.color) {
          return res.send({ succes: false, message: "color is not valid!" });
        }
        if (err.errors.accountId) {
          return res.send({ succes: false, message: "accountId is not unique!" });
        }
      }
      res.json({
        success: true
      });
    });
  });

  app.get("/user", async (req, res) => {
    try {
      const getUser = await User.findOne(req.query);
      res.json(getUser);
    } catch (err) {
      console.error(err);
    }
  });

  app.delete("/user", (req, res) => {
    const { accountId, color } = req.query;

    User.findOneAndDelete({ accountId: +accountId, color: `#${color}` })
      .then(() => {
        res.json({ succes: true, message: `Account ${+accountId} deleted!` });
      })
      .catch(err => {
        res.json(err);
      });
  });
});
