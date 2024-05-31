const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({
      message: "Unauthorozed HTTP, Token not provided",
    });
  }

  const jwtToken = token.replace("Bearer", "").trim();

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_KEY);
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });
    console.log(userData);
    req.user = userData;
    req.token = token;
    req.id = userData.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized, Invalid token" });
  }
};

module.exports = authMiddleware;
