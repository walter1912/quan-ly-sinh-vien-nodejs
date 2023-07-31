const asyncHandler = require("express-async-handler");
const Comment = require("../models/Comment");

// @desc lấy danh sách comment by post
// @route  GET '/post/:postId'
// @access public
const getCommentsByPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const comments = await Comment.find({ postId });
  if (!comments) {
    res.status(404);
    throw new Error("Không tìm thấy comment trong bài viết này!");
  }
  let result = comments.map((cmt) => dataToDto(cmt));
  let message = `Lấy danh sách comment thành công`;
  if (result.length < 1) {
    message = "Chưa có ai comment vào bài viết này";
  }
  res.status(200).json({
    message,
    comments: result,
  });
});
// @desc lấy  comment by id
// @route  GET /:id
// @access public
const getCommentById = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    res.status(404);
    throw new Error("Không tìm thấy comment!");
  }
  const result = dataToDto(comment);
  res.status(200).json({
    message: `Lấy comment thành công`,
    comment: result,
  });
});
// @desc create comment
// @route  POST /
// @access public
const createComment = asyncHandler(async (req, res) => {
  const { postId, repCommentId, content, level } = req.body;
  if (!postId || !content) {
    res.status(400);
    throw new Error("Có trường chưa nhập!");
  }
  const dataPost = {
    userId: req.user.id,
    postId,
    repCommentId,
    content,
    level,
  };
  const comment = await Comment.create(dataPost);
  const result = dataToDto(comment);

  res.status(201).json({
    message: `${req.user.username} đã comment`,
    comment: result,
  });
});
// @desc update comment
// @route  PUT /
// @access public
const updateComment = asyncHandler(async (req, res) => {});

function dataToDto(cmt) {
  const { postId, repCommentId, content, level, createAt, updateAt } = cmt;
  let cmtDto = {
    id: cmt.id,
    postId,
    repCommentId,
    content,
    level,
    createAt,
    updateAt,
  };
  return cmtDto;
}
module.exports = {
  getCommentsByPost,
  getCommentById,
  createComment,
  updateComment,
};
