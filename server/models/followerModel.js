const mongoose = require("mongoose");

const followerSchema = new mongoose.Schema(
  {
    followerId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    writerId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Followers", followerSchema);
