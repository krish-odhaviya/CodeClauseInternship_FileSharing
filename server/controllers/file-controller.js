const File = require("../models/file-model");

const upload = async (req, res, next) => {
  await File.create({
    filename: req.file.originalname,
    filetype: req.file.mimetype,
    filesize: req.file.size,
    filepath: req.file.path,
    expirydate: req.query.expirydate,
    email: req.query.email,
    password: req.query.password,
  }).then((file) => {
    res.status(200).json({
      message: "File uploaded success fully.",
      fileId: file._id.toString(),
    });
  });
};

const view = async (req, res, next) => {
  const fileId = req.params.fileId;
  try {
    const output = await File.findById(fileId);
    if (!output) {
      return res.status(401).json({
        message: "File not found",
        extraDetailes: "May your file expired",
      });
    }
    res.status(200).json(output);
  } catch (error) {
    res.status(400).json({ message: "File not found", error: error });
  }
};

const viewAll = async (req, res, next) => {
  const email = req.params.email;
  try {
    const output = await File.find({email:email});
    if (!output) {
      return res.status(401).json({
        message: "File not found",
        extraDetailes: "May your file expired",
      });
    }
    res.status(200).json(output);
  } catch (error) {
    res.status(400).json({ message: "File not found", error: error });
  }
};

const download = (req, res, next) => {
  const path = req.query.path;
  res.download("./uploads" + path);
};

module.exports = { upload, view, viewAll, download };
