const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: {
    type: String,
    require: true,
  },
  filetype: {
    type: String,
    require: true,
  },
  filesize: {
    type: String,
    require: true,
  },
  filepath: {
    type: String,
    require: true,
  },
  expirydate: {
    type: Date,
    require: false,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: false,
  },
});

const File = new  mongoose.model("File", fileSchema);

module.exports = File;
