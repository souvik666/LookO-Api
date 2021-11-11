const express = require("express");
const Connect = require("./src/configs/Db");
const app = express();
const OTP = require("./src/controllers/OTP.Controller");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/otp", OTP);

app.listen(2345, async (req, res) => {
  Connect();
  console.log("Listening on 2345");
});