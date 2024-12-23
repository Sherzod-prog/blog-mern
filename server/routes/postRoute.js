const express = require("express");
const { authMiddleware: userAuth } = require("../middleware/authMiddleware.js");
const {
  stats,
  getFollowers,
  getPostContent,
  createPost,
  commentPost,
  updatePost,
  getPosts,
  getPopularContents,
  getComments,
  deletePost,
  deleteComment,
  getPost,
} = require("../controllers/postController.js");

const router = express.Router();

// Admin router
router.post("/admin-analytics", userAuth, stats);
router.post("/admin-followers", userAuth, getFollowers);
router.post("/admin-content", userAuth, getPostContent);
router.post("/create-post", userAuth, createPost);

// Like & comment on post
router.post("/comment/:id", userAuth, commentPost);

// Update post
router.patch("/update/:id", userAuth, updatePost);

// Get posts Routes
router.get("/", getPosts);
router.get("/popular", getPopularContents);
router.get("/:postId", getPost);
router.get("/comments/:postId", getComments);

// Delete post
router.delete("/:id", userAuth, deletePost);
router.delete("/comment/:id/:postId", userAuth, deleteComment);

module.exports = { router };
