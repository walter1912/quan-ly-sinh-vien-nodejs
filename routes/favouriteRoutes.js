const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const {
  getFavoriteByUser,
  getFavoriteByPost,
  createFavorite,
  updateFavorite,
  checkExistedFavorite,
} = require("../controllers/favoriteController");

const routes = express.Router();
// thuộc bài viết gồm: userId, postId, timestamps
routes.use(validateToken);
// + get '/user/:userId' lấy các tương tác của người dùng đó
routes.route("/user/:userId").get(getFavoriteByUser);
// + get '/post/:postId' lấy các tương tác của bài viết đó
routes.route("/post/:postId").get(getFavoriteByPost);
// - post '/'
routes.route("/").post(createFavorite);
// - put '/:id'
routes.route("/:id").put(updateFavorite);
// check existed
routes.route("/checkExist/:userId/:postId").get(checkExistedFavorite);

module.exports = routes;