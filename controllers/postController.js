const asyncHandler = require("express-async-handler");
const Post = require("../models/Post");
const { checkAdmin } = require("../middleware/checkRole");
const User = require("../models/User");

// @desc
// @route GET api/posts
// @access public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  if (!posts) {
    res.status(404);
    throw new Error("Không tìm thấy bài viết nào!");
  }
  const result = posts.map((p) => dataToDto(p));
  let message = "Lấy tất cả bài viết thành công";
  if (result.length < 1) {
    message = "Danh sách bài viết rỗng!";
  }
  res.status(200).json({
    message,
    posts: result,
  });
});

// @desc
// @route GET api/posts/user/:userId
// @access public
const getPostsByUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const posts = await Post.find({ userId });

  if (!posts) {
    res.status(404);
    throw new Error(`Không tìm thấy bài viết nào!`);
  }
  const user = await User.findById(userId);
  const result = posts.map((p) => dataToDto(p));
  let message = `Lấy tất cả bài viết của ${user.username} thành công`;
  if (result.length < 1) {
    message = "${user.username} chưa tạo bài viết nào!";
  }
  res.status(200).json({
    message,
    posts: result,
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
    throw new Error(`Không tìm thấy bài viết!`);
  }
  const result = dataToDto(post);
  res.status(200).json({
    message: "Lấy thành công thông tin bài viết",
    post: result,
  });
});

// @desc
// @route POST api/posts
// @access private
const createPost = asyncHandler(async (req, res) => {
  console.log("createPost is running ...");
  const { thumbnail, title, content } = req.body;
  if (!thumbnail || !title || !content) {
    res.status(400);
    throw new Error("Bài viết có trường chưa nhập!");
  }
  const dataPost = {
    userId: req.user.id,
    thumbnail,
    title,
    content,
  };
  const post = await Post.create(dataPost);
  const result = dataToDto(post);
  res.status(201).json({
    message: "Tạo bài viết thành công",
    post: result,
  });
});

// @desc
// @route PUT api/posts/:id
// @access private
const updatePost = asyncHandler(async (req, res) => {
  // check
  const { id } = req.params;
  const postExisted = await Post.findById(id);
  if (!postExisted) {
    res.status(404);
    throw new Error(`Không tìm thấy bài viết!`);
  }
  let kt = req.user.id == postExisted.userId;
  let who = `${req.user.username}`;
  if (kt === false) {
    who = "admin";
    console.log("kt = false => checkAdmin");
    if (req.user.role !== 1912 || req.user.username !== "eimron") {
      who = "no one";
      res.status(403);
      throw new Error("Bạn không có quyền chỉnh sửa bài viết này!");
    }
  }
  const { thumbnail, title, content } = req.body;
  if (!thumbnail || !title || !content) {
    res.status(400);
    throw new Error("Có trường chưa nhập!");
  }
  const dataUpdate = {
    userId: postExisted.userId,
    thumbnail,
    title,
    content,
  };
  const updated = await Post.findByIdAndUpdate(id, dataUpdate, {
    new: true,
  });
  const result = postFixId(updated);
  res.status(201).json({
    message: `Cập nhật thành công bài viết bởi ${who}`,
    post: result,
  });
});

// @desc
// @route DELETE api/posts/:id
// @access private
const deletePost = asyncHandler(async (req, res) => {});

function dataToDto(post) {
  const postDto = {
    id: post.id,
    thumbnail: post.thumbnail ,
    title: post.title ,
    userId: post.userId,
    createdAt: post.createdAt,
  };
  return postDto;
}
function postFixId(post) {
  const postDto = {
    id: post.id,
    title: post.title,
    userId: post.userId,
    content: post.content,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    thumbnail: post.thumbnail,
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
