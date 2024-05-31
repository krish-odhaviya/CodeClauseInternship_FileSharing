const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
  await mongoose
    .connect(URI)
    .then(() => {
      console.log("backend is connected to DB");
    })
    .catch((err) => {
      console.error({ error: err, msg: "Faliled to connect DB" });
      process.exit();
    });
};

module.exports = connectDB;
