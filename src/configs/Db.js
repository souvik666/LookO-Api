const mongoose = require("mongoose");

const Connect = async () => {
  mongoose.connect("mongodb://localhost:27017/myapp");
  return console.log("DB online");
};

module.exports = Connect;
