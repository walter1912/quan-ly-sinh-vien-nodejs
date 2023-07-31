const asyncHandler = require("express-async-handler");
const Favorite = require("../models/Favorite");

// @desc lấy danh sách favorite by user
// @route  GET '/user/:userId'
// @access public
const getFavoriteByUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const favorites = await Favorite.find({ userId });
  if (!favorites) {
    res.status(404);
    throw new Error(`Không tìm thấy lượt tương tác của ${userId}`);
  }
  const result = favorites.map((fav) => dataToDto(fav));
  res.status(200).json(result);
});

// @desc lấy danh sách favorite by post
// @route  GET '/post/:postId'
// @access public
const getFavoriteByPost = asyncHandler(async (req, res) => {
  const postId = req.params.postId;
  const favorites = await Favorite.find({ postId });
  if (!favorites) {
    res.status(404);
    throw new Error(`Không tìm thấy lượt tương tác của ${postId}`);
  }
  const result = favorites.map((fav) => dataToDto(fav));
  res.status(200).json(result);
});

// @desc tạo favorite
// @route  POST '/'
// @access public
const createFavorite = asyncHandler(async (req, res) => {
  const { postId, type } = req.body;
  if (!postId || !type) {
    res.status(400);
    throw new Error("Có trường chưa nhập");
  }
  const dataPost = {
    userId: req.user.id,
    postId,
    type,
  };
  const favorite = await Favorite.create(dataPost);
  res.status(201).json(favorite);
});

// @desc update favorite
// @route  PUT '/:id'
// @access public
const updateFavorite = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const favorite = await Favorite.findById(id);
  if (!favorite) {
    res.status(404);
    throw new Error("Khoong tim thay luot tuong tac");
  }
  const { postId, type } = req.body;
  if (!postId || !type) {
    res.status(400);
    throw new Error("Có trường chưa nhập");
  }
  const dataUpdate = {
    postId,
    type,
  };
  const updated = await Favorite.findByIdAndUpdate(id, dataUpdate, {
    new: true,
  });
  res.status(201).json(updated);
});

// @desc checkExisted favorite
// @route  GET /Favorites/checkExist?userId=${userId}&postId=${postId}
// @access public
const checkExistedFavorite = asyncHandler(async (req, res) => {
  const { userId, postId } = req.params;
  const favExisted = await Favorite.findOne({ userId, postId });
  if (!favExisted) {
    res.status(404);
    throw new Error("Không tìm thấy lượt tương tác");
  }
  res.status(200).json(favExisted);
});

function dataToDto(ele) {
  const { postId, userId, type, creaAt, updateAt } = ele;
  const dto = {
    id: ele.id,
    postId,
    userId,
    type,
    creaAt,
    updateAt,
  };
  return dto;
}

module.exports = {
  getFavoriteByPost,
  getFavoriteByUser,
  checkExistedFavorite,
  createFavorite,
  updateFavorite,
};
