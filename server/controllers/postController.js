const mongoose = require("mongoose");
const Post = require("../models/postModel");
const Views = require("../models/viewsModel");
const User = require("../models/userModel");
const Followers = require("../models/followerModel");
const Comment = require("../models/commentModel");
const stats = async (req, res, next) => {
  try {
    const { query } = req.query;
    const { userId } = req.body.user;

    const numofDays = Number(query) || 28;

    const currentDate = new Date();
    const startDate = new Date();

    startDate.setDate(currentDate.getDate() - numofDays);

    const totalPosts = await Post.find({
      "author.id": userId,
    }).countDocuments();

    const totalViews = await Views.find({
      "author.id": userId,
      createdAt: { $gte: startDate, $lte: currentDate },
    }).countDocuments();

    const totalFollowers = await User.findById(userId);

    const viewStats = await Views.aggregate([
      {
        $match: {
          user: new mongoose.ObjectId(userId),
          createdAt: { $gte: startDate, $lte: currentDate },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          Total: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const follwersStats = await Followers.aggregate([
      {
        $match: {
          user: new mongoose.ObjectId(userId),
          createdAt: { $gte: startDate, $lte: currentDate },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          Total: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const last5Followers = await Followers.findById(userId).populate({
      path: "followerId",
      options: { sort: { _id: -1 } },
      perDocumentLimit: 5,
      populate: {
        path: "followerId",
        select: "name email avatar accountType followers -password",
      },
    });

    const last5Posts = await Post.find({ "author.id": userId })
      .limit(5)
      .sort({ _id: -1 });

    res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      totalPosts,
      totalViews,
      totalFollowers,
      followers: totalFollowers?.followers?.length,
      viewStats,
      follwersStats,
      last5Followers: last5Followers?.followerId,
      last5Posts,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong stats" });
  }
};

const getFollowers = async (req, res, next) => {
  try {
    const { userId } = req.body.user;

    // pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    const result = await User.findById(userId).populate({
      path: "followers",
      options: { sort: { _id: -1 }, limit, skip },
      populate: {
        path: "followerId",
        select: "name email image accountType followers -password",
      },
    });

    const totalFollowers = await User.findById(userId);

    const numOfPages = Math.ceil(totalFollowers?.followers?.length / limit);

    res.status(200).json({
      data: result?.followers,
      total: totalFollowers?.followers?.length,
      numOfPages,
      page,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

const getPostContent = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    let queryResult = await Post.find({ "author.id": userId })
      .populate({
        path: "author",
        select: "name email image accountType followers -password",
      })
      .skip(skip)
      .limit(limit);

    // pagination
    //records count
    const totalPost = await Post.find({ "author.id": userId }).countDocuments();
    const numOfPages = Math.ceil(totalPost / limit);

    res.status(200).json({
      success: true,
      message: "Content loaded successfully",
      totalPost,
      data: queryResult,
      numOfPages,
      page,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

const createPost = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { title, description, image, cat } = req.body;

    if (!title || !description || !image || !cat) {
      return next("All fields are required. Please enter all fields");
    }

    const user = await User.findById(userId);
    const author = {
      name: user.name,
      id: user._id,
    };
    const post = await Post.create({
      author,
      title,
      description,
      image,
      cat,
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

const commentPost = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { description } = req.body;
    const { id } = req.params;

    if (!description) {
      return res.status(404).json({ message: "Comment is required" });
    }

    const newComment = new Comment({ description, user: userId, post: id });
    await newComment.save();

    await Post.findOneAndUpdate(
      { _id: id },
      { $push: { comments: newComment._id } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Comment created successfully",
      newComment,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, image, cat } = req.body;

    const post = await Post.findByIdAndUpdate(
      id,
      { title, description, image, cat },
      { new: true }
    );
    res.status(201).json({
      success: true,
      message: "Action performed successfully",
      data: post,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

const getPosts = async (req, res, next) => {
  try {
    const { cat } = req.query;

    let query = { status: true };
    if (cat) {
      query.cat = cat;
    }
    let queryResult = Post.find(query)
      .populate({
        path: "author",
        select: "title image -password",
      })
      .sort({ _id: -1 });

    // pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    // records count
    const totalPost = await Post.countDocuments(queryResult);
    const numOfPages = Math.ceil(totalPost / limit);
    queryResult.skip(skip).limit(limit);
    const posts = await queryResult;

    res.status(200).json({
      success: true,
      totalPost,
      data: posts,
      numOfPages,
      page,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

const getPopularContents = async (req, res, next) => {
  try {
    const posts = await Post.aggregate([
      { $match: { status: true } },
      {
        $project: {
          title: 1,
          slug: 1,
          image: 1,
          views: { $size: "$views" },
          createdAt: 1,
        },
      },
      { $sort: { views: -1 } },
      { $limit: 5 },
    ]);

    const writers = await User.aggregate([
      { $match: { accountType: { $ne: "User" } } },
      {
        $project: {
          name: 1,
          image: 1,
          followers: { $size: "$followers" },
        },
      },
      { $sort: { followers: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json({
      success: true,
      message: "Successful",
      data: { posts, writers },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

const getPost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId).populate({
      path: "author",
      select: "name avatar -password",
    });

    const newView = await Views.create({
      author: post.author,
      post: postId,
    });
    post.views.push(newView?._id);
    await Post.findByIdAndUpdate(postId, post, { new: true });

    res.status(200).json({
      success: true,
      message: "Successful",
      data: post,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};
const getComments = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const postComments = await Comment.find({ post: postId })
      .populate({
        path: "user",
        select: "name avatar -password",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Successful",
      data: postComments,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};
const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { id, postId } = req.params;
    await Comment.findByIdAndDelete(id);

    // remove the comment id from the post comments array
    const result = await Post.updateOne(
      { _id: postId },
      { $pull: { comments: id } },
      { new: true }
    );
    if (result.modifiedCount > 0) {
      res.status(200).json({
        success: true,
        message: "Comment deleted successfully",
      });
    } else {
      res.status(404).json({
        success: true,
        message: "Post or comment not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

module.exports = {
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
};
