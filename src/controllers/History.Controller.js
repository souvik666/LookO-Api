const express = require("express");
const base64ToImage = require("base64-to-image");
const History = require("../models/History");
const router = express.Router();
var crypto = require("crypto");

const Base64Toimg = (str) => {
  const filename = crypto.randomBytes(10).toString("hex");
  const base64Str = str;
  const path = "history";
  const initialCompile = { fileName: filename, type: "png" };
  const compliedImage = base64ToImage(base64Str, "./upload/", initialCompile);
  return compliedImage;
};

router.post("/", async (req, res) => {
  const compliedImage = Base64Toimg(req.body.uri);
  const { fileName } = compliedImage;
  const image = `http://localhost:2345/historyimg/${fileName}`;
  const newEntry = await History.create({
    photo: image,
    meta: new Date(),
    user: req.body.id,
  });

  return res.json(newEntry);
});

router.get("/", async (req, res) => {
  return res.json(await History.find());
});

router.get("/:id", async (req, res) => {
  const fetchHistory = await History.find({ user: req.body.id });
  res.send({ fetchHistory });
});

module.exports = router;
