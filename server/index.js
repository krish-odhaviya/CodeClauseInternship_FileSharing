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

const cors_url = process.env.CORS_URL || "http://localhost:5173";

const corsOptions = {
  origin: cors_url, // Allow requests from this origin
  methods: "GET,POST,OPTIONS,PUT,DELETE,PATCH,TRACE,CONNECT",
  allowedHeaders: "Content-Type, Authorization",
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));
app.options("*", (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": cors_url,
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS,PUT,DELETE,PATCH",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  });
  res.sendStatus(200);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res.send("server is in running state :)");
});
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
