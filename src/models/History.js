const mongoose = require("mongoose");
const UserSchema = require("./User.model");

const HistorySchema = mongoose.Schema(
  {
    photo: { type: "string" },
    meta: { type: "string" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: UserSchema },
  },
  {
    timeStamp: new Date(),
  }
);
const History = mongoose.model("History", HistorySchema);
module.exports = History;
