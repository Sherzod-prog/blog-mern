const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    cat: {
      type: String,
    },
    views: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Views",
      },
    ],
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    comments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Comment",
      },
    ],
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
