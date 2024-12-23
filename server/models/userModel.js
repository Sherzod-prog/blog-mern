const moongoose = require("mongoose");

const userSchema = new moongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    accountType: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    password: {
      type: String,
      select: true,
    },
    provider: {
      type: String,
      default: "Sherz",
    },
    followers: [
      {
        type: moongoose.Schema.ObjectId,
        ref: "Followers",
      },
    ],
  },
  { timestamps: true }
);

module.exports = moongoose.model("User", userSchema);
