const express = require("express");
const {
  getCommentsByPost,
  getCommentById,
  createComment,
  updateComment,
} = require("../controllers/commentController");
const validateToken = require("../middleware/validateTokenHandler");

const routes = express.Router();

routes.use(validateToken);
// + get '/post/:postId': lấy tất cả comment của bài viết
routes.route("/post/:postId").get(getCommentsByPost);
routes.route("/:id").get(getCommentById);
// - post '/': người dùng comment vào bài viết
routes.route("/").post(createComment);
// - put, delete: người dùng tạo comment mới thực hiện được
routes.route("/:id").put(updateComment);
module.exports = routes;
