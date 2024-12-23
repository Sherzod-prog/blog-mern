const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const emailVerification = require("../models/emailVerication.js");
const { generateOTP, hashString } = require("./index.js");

dotenv.config();

const { AUTH_EMAIL, AUTH_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.mail.ru",
  port: 587,
  secure: false,
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASSWORD,
  },
});
const sendlVerificationEmail = async (user, res, token) => {
  const { _id, email, name } = user;
  const otp = generateOTP();

  //mail options
  const mailOptions = {
    from: AUTH_EMAIL,
    to: email,
    subject: "Email Verification",
    html: `<h1>Hi ${name},</h1>
        <p>Thank you for registering with us. Use the following OTP to complete your registration:</p>
        <h2>${otp}</h2>
        <p>This OTP is valid for 2 minutes.</p>
        <p>If you did not request this email, please ignore it.</p>`,
  };

  try {
    const hashedToken = await hashString(String(otp));
    const newVerificationEmail = await emailVerification.create({
      userId: _id,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 120000,
    });
    if (newVerificationEmail) {
      await transporter
        .sendMail(mailOptions)
        .then(() => {
          res.cookie("refreshToken", token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            secure: true,
          });
          res.status(201).send({
            success: "PENDING",
            message:
              "Otp has been sent to your email. Check your email to verify your account",
            user,
            token,
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(404).json({
            message: "Verification something went wrong",
          });
        });
    }
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ message: "Sending Verification something went wrong" });
  }
};

module.exports = { sendlVerificationEmail };
