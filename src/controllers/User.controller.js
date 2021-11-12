const User = require("../models/User.model");
const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("avatar"), async function (req, res, next) {
  const proImg = req.file.filename;
  const newEntry = await User.create({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    image: proImg,
    gender: req.body.gender,
  });
  res.send(newEntry);
});

module.exports = router;
