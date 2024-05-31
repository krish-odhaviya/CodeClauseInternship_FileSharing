const User = require("../models/user-model");
const home = (req, res) => {
  res.send("hello world");
};

const register = async (req, res) => {
  try {
    const { email, firstname, surname, password } = req.body;

    //checks if user exist or not before creating user.
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        message: "user already exists",
        extraDetailes: "please change your email to create new account.",
      });
    }

    //creating user if user does not exists.
    await User.create({
      email,
      firstname,
      surname,
      password,
    }).then(async (userCreated) => {
      res.status(200).json({
        message: "registration successful",
        Token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      });
    });
  } catch {
    res.status(400).json({ message: "internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //checking is user register in app
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "invalid credentials",
        extraDetailes: "user does not exists.",
      });
    }

    //checking credentials are correnct or not
    if (await user.checkPassword(password)) {
      res.status(200).json({
        message: "login successful",
        token: await user.generateToken(),
        userID: user._id.toString(),
      });
    } else {
      res.status(401).json({
        message: "invalid credentials",
        extraDetailes: "password is incorrect.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

const user = (req, res) => {
  try {
    const userData = req.user;
    res.json(userData);
  } catch (error) {
    res.json({ error: "Internal server error" });
  }
};

module.exports = { home, register, login, user };
