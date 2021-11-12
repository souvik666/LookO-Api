const express = require("express");
const Connect = require("./src/configs/Db");
const app = express();
const OTP = require("./src/controllers/OTP.Controller");
const usercontroller = require("./src/controllers/User.controller");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/otp", OTP);
app.use("/user", usercontroller);
app.use("/profile", express.static("upload/images"));

app.listen(2345, async (req, res) => {
  Connect();
  console.log("Listening on 2345");
});
