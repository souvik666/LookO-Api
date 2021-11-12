const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: { type: "string" },
    Phone: { type: "string" },
    photo: { type: "string" },
    email: { type: "string" },
    image: { type: "string" },
    gender: { type: "string" },
  },

  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
