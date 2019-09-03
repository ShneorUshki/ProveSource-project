const mongoose = require("mongoose");
let validator = require("validator");

const Account = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      validate: value => {
        return validator.isEmail(value);
      }
    },
    name: { type: String },
    age: { type: Number }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", Account);
