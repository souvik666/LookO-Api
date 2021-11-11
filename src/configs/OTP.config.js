const Vonage = require("@vonage/server-sdk");
require("dotenv").config();
const vonage = new Vonage({
  apiKey: process.env.apiKey,
  apiSecret: process.env.apiSecret,
});

module.exports = vonage;
