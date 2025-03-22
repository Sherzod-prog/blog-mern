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
      name: { type: String, required: true },
      id: { type: mongoose.Schema.Types.ObjectId, required: true },
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
