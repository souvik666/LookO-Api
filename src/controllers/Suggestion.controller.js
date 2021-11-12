const express = require("express");
const suggestions = require("../models/sugeestions");
const router = express.Router();

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

router.get("/", (req, res) => {
  const rndInt = randomIntFromInterval(0, 6);
  res.json(suggestions[rndInt || 0]);
});

module.exports = router;
