const emailVerication = require("../models/emailVerication");
const User = require("../models/userModel");
const Followers = require("../models/followerModel");
const { compareString } = require("../utils");
const { sendlVerificationEmail } = require("../utils/sendEmail");

const OTPVerification = async (req, res, next) => {
  try {
    const { userId, otp } = req.params;

    const result = await emailVerication.findOne({ userId });
    const { expiresAt, token } = result;

    if (expiresAt < Date.now()) {
      await emailVerication.findOneAndDelete({ userId });
      const message = "Verification token has expired, please try again.";
      return res.status(400).json({ message });
    } else {
      const isMatch = await compareString(otp, token);

      if (isMatch) {
        await Promise.all([
          User.findOneAndUpdate({ _id: userId }, { emailVerified: true }),
          emailVerication.findOneAndDelete({ userId }),
        ]);

        const message = "Email verified successfully.";
        return res.status(200).json({ message });
      } else {
        const message = "Verification failed or OTP is invalid.";
        return res.status(404).json({ message });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

const resendOTP = async (req, res, next) => {
  try {
    const { id } = req.params;

    await emailVerication.findOneAndDelete({ userId: id });

    const user = await User.findById(id);

    user.password = undefined;

    const tokens = tokenServis.generateToken({
      email: user.email,
      name: user.name,
      userId: user._id,
    });

    await tokenServis.saveToken(user._id, tokens.refreshToken);

    if (user?.accountType === "Writer") {
      sendlVerificationEmail(user, res, tokens);
    } else {
      res.status(404).json({
        message: "Something went wrong",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

const followWriter = async (req, res, next) => {
  try {
    const followerId = req.body.user.userId; // logged in userfollowerId;
    const { id } = req.params;

    const checks = await Followers.findOne({ followerId });

    if (checks) {
      return res.status(201).json({
        success: true,
        message: "You are already following the writer",
      });
    }
    const writer = await User.findById(id);

    const newFollower = await Followers.create({
      followerId,
      writerId: id,
    });

    writer?.followers?.push(newFollower?._id);

    await User.findByIdAndUpdate(id, writer, { new: true });

    res.status(201).json({
      success: true,
      message: "You are now following the writer" + writer?.name,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { firstName, lastName, image } = req.body;
    if (!firstName || !lastName) {
      return next("Please provide first name and last name");
    }
    const { userId } = req.body.user;

    const updateUser = {
      name: firstName + " " + lastName,
      image,
      _id: userId,
    };

    const user = await User.findOneAndUpdate(userId, updateUser, {
      new: true,
    });

    const tokens = tokenServis.generateToken({
      email: user.email,
      name: user.name,
      userId: user._id,
    });

    await tokenServis.saveToken(user._id, tokens.refreshToken);
    user.password = undefined;

    res.status(201).json({
      success: true,
      message: "User updated successfully",
      user,
      token: tokens.accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

const getWriter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate({
      path: "followers",
      select: "followerId",
    });

    if (!user) {
      return res
        .status(200)
        .send({ success: false, message: "Writer not found" });
    }

    user.password = undefined;

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

module.exports = {
  OTPVerification,
  resendOTP,
  followWriter,
  updateUser,
  getWriter,
};
