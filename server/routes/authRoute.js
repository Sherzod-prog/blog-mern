const express = require("express");

const {
  googleSignup,
  login,
  register,
  logOut,
} = require("../controllers/authController.js");

const authRoute = express.Router();

authRoute.post("/register", register);
authRoute.post("/google-signup", googleSignup);
authRoute.post("/login", login);
authRoute.post("/logout", logOut);

module.exports = { authRoute }; // Change this line
