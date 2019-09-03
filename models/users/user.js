const mongoose = require("mongoose");
let validator = require("validator");
const beautifyUnique = require("mongoose-beautiful-unique-validation");

const User = new mongoose.Schema(
  {
    accountId: { type: Number, unique: true },
    name: { type: String },
    color: {
      type: String,

      validate: value => {
        return validator.isHexColor(value);
      }
    }
  },
  { timestamps: true }
);

User.plugin(beautifyUnique);
module.exports = mongoose.model("User", User);
