const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: { type: "string" },
  Phone: { type: "string" },
  photo: { type: "string" },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
