require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

//Router
const authRouter = require("./router/auth-router");
const fileRouter = require("./router/file-router");

//Database
const connectDB = require("./utils/db");

const errorMiddleware = require("./middlewares/error-middleware");

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.use("/api/auth", authRouter);
app.use("/api", fileRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT | 3000;
console.log("connecting to DB...");
connectDB().then(() => {
  console.log("server starting...");
  app.listen(PORT, () => {
    console.log(`server is running on port : ${PORT}`);
  });
});
