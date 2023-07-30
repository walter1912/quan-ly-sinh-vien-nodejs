const asyncHandler = require("express-async-handler");
const Post = require("../models/Post");
const { checkAdmin } = require("../middleware/checkRole");

// @desc
// @route GET api/posts
// @access public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  if (posts.length < 1) {
    res.status(404);
    throw new Error("Không có bài viết nào");
  }
  let postResult = posts.map((post) => postToDto(post));
  res.status(200).json({
    message: "lấy danh sách post",
    posts: postResult,
  });
});

// @desc
// @route GET api/posts/user/:userId
// @access public
const getPostsByUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const posts = await Post.find({ userId });
  if (posts.length < 1) {
    res.status(404);
    throw new Error("Không có bài viết nào");
  }
  let postResult = posts.map((post) => postToDto(post));
  res.status(200).json({
    message: "lấy danh sách post by user",
    posts: postResult,
  });
});

// @desc
// @route GET api/posts/:id
// @access public
const getPostById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);
  if (!post) {
    res.status(404);
    throw new Error(`Không tìm thấy bài viết có id = ${id}`);
  }
  res.status(200).json({
    message: "Get post by id",
    post,
  });
});

// @desc
// @route POST api/posts
// @access private
const createPost = asyncHandler(async (req, res) => {
  const { thumbnail, title, content } = req.body;
  if (!thumbnail || !title || !content) {
    res.status(400);
    throw new Error("Có trường chưa nhập");
  }
  const dataPost = {
    userId: req.user.id,
    thumbnail,
    title,
    content,
  };
  const post = await Post.create(dataPost);
  res.status(201).json({
    message: "Post bài viết",
    post,
  });
});

// @desc
// @route PUT api/posts/:id
// @access private
const updatePost = asyncHandler(async (req, res) => {
  // check
  const id = req.params.id;
  const postExisted = await Post.findById(id);
  if (!postExisted) {
    res.status(404);
    throw new Error(`Không tìm thấy bài viết có id = ${id}`);
  }
  let kt = req.user.id == postExisted.userId;
  if (kt === false) {
    console.log("kt = false => checkAdmin");
    if (req.user.role !== 1912 || req.user.username !== "eimron") {
      res.status(401);
      throw new Error("Hành động nguy hiểm, bạn không truy cập được");
    }
  } 
  const { thumbnail, title, content } = req.body;
  if (!thumbnail || !title || !content) {
    res.status(400);
    throw new Error("Có trường chưa nhập");
  }
  const dataUpdate = {
    userId: postExisted.userId,
    thumbnail,
    title,
    content,
  };
  const updated = await Post.findByIdAndUpdate(req.params.id, dataUpdate ,{
    new: true,
  });
  
  res.status(201).json({
    message: `Update bài viết bởi ${kt? req.user.username:"admin"}`,
    post: updated,
  });
});

// @desc
// @route DELETE api/posts/:id
// @access private
const deletePost = asyncHandler(async (req, res) => {});

function postToDto(post) {
  const postDto = {
    id: post.id,
    thumbnail: post.thumbnail,
    title: post.title,
    userId: post.userId,
    createAt: post.createAt,
  };
  return postDto;
}
module.exports = {
  getPosts,
  getPostsByUser,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
