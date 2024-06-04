const express = require("express");
const router = express.Router();

//multer for storing file on server from frontend
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

//controller
const fileController = require("../controllers/file-controller");

router.route("/upload").post(upload.single("file"), fileController.upload);

router.route("/view/:fileId").get(fileController.view);
router.route("/view-all/:email").get(fileController.viewAll);
router.route("/delete").post(fileController.deleteFile);
router.route("/download").get(fileController.download);
module.exports = router;
