const express = require("express");
const Connect = require("./src/configs/Db");
const app = express();
const OTP = require("./src/controllers/OTP.Controller");
const usercontroller = require("./src/controllers/User.controller");
const HistoryController = require("./src/controllers/History.Controller");
const suggestionsConbtroller = require("./src/controllers/Suggestion.controller");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/profile", express.static("upload/images"));
app.use("/historyimg", express.static("./upload"));

app.use("/otp", OTP);
app.use("/user", usercontroller);
app.use("/history", HistoryController);
app.use("/suggestions", suggestionsConbtroller);

app.listen(2345, async (req, res) => {
  Connect();
  console.log("Listening on 2345");
});
