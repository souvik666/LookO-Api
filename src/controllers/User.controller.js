/* const User = require("../models/User.model");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

function errHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    res.json({
      success: 0,
      message: err.message,
    });
  }
}
router.use(errHandler);
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});
router.use("/avatar", express.static("upload/images"));

router.post("/", upload.single("avatar"), async function (req, res, next) {
  const proImg = req.file.filename;
  const newEntry = await User.create({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    image: `http://localhost:2345/avatar/${proImg}`,
    gender: req.body.gender,
  });
  res.send({
    newEntry,
    proFileimgurl: `http://localhost:2345/avatar/${proImg}`,
  });
});

router.patch("/:id", upload.single("avatar"), async function (req, res, next) {
  const proImg = req.file.filename;
  const whoHeis = await User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    image: proImg,
    gender: req.body.gender,
  });
  const whoishenow = await User.findById(req.params.id);
  res.send({ whoishenow });
}) */
const User = require("../models/User.model");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});

router.post("/", upload.single("profile"), async (req, res) => {
  const proImg = req.file.filename;
  const newEntry = await User.create({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    image: `http://localhost:2345/profile/${req.file.filename}`,
    gender: req.body.gender,
  });
  return res.json({
    success: 1,
    user: newEntry,
  });
});

router.patch("/:id", upload.single("profile"), async (req, res) => {
  const whoHeis = await User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    image: `http://localhost:2345/profile/${req.file.filename}`,
    gender: req.body.gender,
  });
  return res.send({
    user: whoHeis,
  });
});

router.get("/", async (req, res) => {
  const Alluser = await User.find();
  return res.send({ Alluser });
});

function errHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    res.json({
      success: 0,
      message: err.message,
    });
  }
}
router.use(errHandler);

module.exports = router;
