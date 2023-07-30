const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const { checkAuthen } = require("../middleware/checkRole");
const {
  getPosts,
  getPostsByUser,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const routes = express.Router();

routes.use(validateToken);

// + get '/':
routes.route("/").get(getPosts);
// (không lấy content)
// + get '/:userId':
routes.route("/user/:userId").get(getPostsByUser);
// + get '/:id':
routes.route("/:id").get(getPostById);
// (
//     admin và giảng viên mới post được,
//     còn put, delete thì chỉ người tạo nó mới đc
// )
routes.route("/").post(checkAuthen, createPost);
// -? put '/:id':
// nếu là người tạo bài viết thì sẽ được chỉnh sửa nếu ko thì checkAdmin
routes.route("/:id").put(updatePost);
// -? delete '/:id':
// nếu là người tạo bài viết thì sẽ được xóa nếu ko thì checkAdmin
routes.route("/:id").delete(deletePost);

module.exports = routes;
