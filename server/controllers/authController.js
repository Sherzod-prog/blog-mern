const { hashString, compareString } = require("../utils/index.js");
const { sendlVerificationEmail } = require("../utils/sendEmail.js");

const User = require("../models/userModel");
const tokenServis = require("../service/token.servis.js");
const register = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      image,
      accountType,
      provider,
    } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return next("All fields are required");
    }
    if (accountType === "Writer" && !image) {
      return next("Plese provide profile picture");
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return next("Email already exists, try again");
    }
    const hashPassword = await hashString(password);

    const user = await User.create({
      name: firstName + " " + lastName,
      email,
      password: !provider ? hashPassword : "",
      image,
      accountType,
      provider,
    });
    user.password = undefined;

    const tokens = tokenServis.generateToken({
      userId: user._id,
      email: user.email,
      name: user.name,
    });

    await tokenServis.saveToken(user._id, tokens.refreshToken);

    if (accountType === "Writer") {
      sendlVerificationEmail(user, res, tokens.accessToken);
    } else {
      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: true,
      });
      res.status(201).json({
        success: true,
        message: "Account created successfully",
        user,
        token: tokens.accessToken,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};

const googleSignup = async (req, res, next) => {
  try {
    const { name, email, image, emailVerified } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return next("Email already exists, try again");
    }
    const user = await User.create({
      name,
      email,
      image,
      emailVerified,
      provider: "Google",
    });
    user.password = undefined;

    const tokens = tokenServis.generateToken({
      email: user.email,
      name: user.name,
      userId: user._id,
    });

    await tokenServis.saveToken(user._id, tokens.refreshToken);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user,
      token: tokens.accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return next("Please provide email");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next("invalid email or password");
    }
    if (user.provider === "Google" && password) {
      const tokens = tokenServis.generateToken({
        email: user.email,
        name: user.name,
        userId: user._id,
      });

      await tokenServis.saveToken(user._id, tokens.refreshToken);
      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: true,
      });
      res.setHeader("Authorization", `Bearer ${tokens.accessToken}`);

      res.status(201).json({
        success: true,
        message: "Login successful with google",
        user,
        token: tokens.accessToken,
      });
    }

    // compare password

    const isMatch = await compareString(password, user.password);

    if (!isMatch) {
      return next("invalid email or password");
    }

    if (user?.accountType === "Writer" && !user?.emailVerified) {
      return next("Please verify your email");
    }

    user.password = undefined;

    const tokens = tokenServis.generateToken({
      email: user.email,
      name: user.name,
      userId: user._id,
    });

    await tokenServis.saveToken(user._id, tokens.refreshToken);

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: true,
    });
    res.setHeader("authorization", {
      authorization: `Bearer ${tokens.accessToken}`,
    });

    res.status(201).json({
      success: true,
      message: "Login successfully ",
      user,
      token: tokens.accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};
const logOut = async (req, res, next) => {
  try {
    res.clearCookie("refreshToken");
    res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};
module.exports = { register, login, googleSignup, logOut };
