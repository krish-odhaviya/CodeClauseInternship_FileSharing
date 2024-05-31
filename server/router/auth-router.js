const express = require("express");
const router = express.Router();

//controllers
const authControllers = require("../controllers/auth-controller");

//validator
const validate = require("../middlewares/validate-middleware");
const { signupSchema, signinSchema } = require("../validators/auth-validator");

const authMiddleware = require("../middlewares/auth-middleware");


router.route("/").get(authControllers.home);

router
  .route("/register")
  .post(validate(signupSchema), authControllers.register);

router.route("/login").post(validate(signinSchema), authControllers.login);

router.route("/user").get(authMiddleware, authControllers.user);

module.exports = router;
