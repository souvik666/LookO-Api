const express = require("express");
const vonage = require("../configs/OTP.config");
const User = require("../models/User.model");
const router = express.Router();

let Bucket = [];
let phone = [];
/* Send OTP */
router.post("/", async (req, res) => {
  let OTP = Math.floor(100000 + Math.random() * 900000);
  console.log(OTP);
  if (!Bucket.length) {
    Bucket.push(OTP);
    phone.push(req.body.phone);
    console.log(Bucket);
  } else {
    Bucket = [];
    Bucket.push(OTP);
    phone.push(req.body.phone);
    console.log(Bucket);
  }
  const from = "Vonage APIs";
  const to = `${req.body.phone}`;
  const text = `${OTP}`;
  vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
      console.log(err);
    } else {
      if (responseData.messages[0]["status"] === "0") {
        res.status(200).send("Message sent successfully.");
      } else {
        res
          .status(500)
          .send(
            `Message failed with error: ${responseData.messages[0]["error-text"]}`
          );
      }
    }
  });
});

/* verify OTP */
router.post("/verify", async (req, res) => {
  const ClientRes = req.body.OTP;
  let myuser
  if (!ClientRes) return res.status(404).json({ message: "no otp found" });
  const name = (Math.random() + 1).toString(36).substring(7);
  if (+ClientRes === Bucket[0]) {
     myuser = await User.create({
      name: name,
      phone: phone[phone.length - 1],
    });
    return res.send({ message: "Verification Passed", user: myuser });
  } else {
    return res.send({ message: "Not Matched", user: myuser });
  }
});

module.exports = router;
