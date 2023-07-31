const asyncHandler = require("express-async-handler");
const Favorite = require("../models/Favorite");

// @desc lấy danh sách favorite by user
// @route  GET '/user/:userId'
// @access public
const getFavoriteByUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const favorites = await Favorite.find({ userId });
  if (!favorites) {
    res.status(404);
    throw new Error(`Không tìm thấy lượt tương tác của user}!`);
  }
  const result = favorites.map((fav) => dataToDto(fav));
  res.status(200).json({
    message: "Lấy tất cả lượt tương tác của người dùng thành công",
    favorites: result,
  });
});

// @desc lấy danh sách favorite by post
// @route  GET '/post/:postId'
// @access public
const getFavoriteByPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const favorites = await Favorite.find({ postId });
  if (!favorites) {
    res.status(404);
    throw new Error(`Không tìm thấy lượt tương tác của bài viết!`);
  }
  const result = favorites.map((fav) => dataToDto(fav));
  res.status(200).json({
    message: "Lấy tất cả lượt tương tác của bài viết thành công",
    favorites: result,
  });
});

// @desc tạo favorite
// @route  POST '/'
// @access public
const createFavorite = asyncHandler(async (req, res) => {
  const { postId, type } = req.body;
  if (!postId || !type) {
    res.status(400);
    throw new Error("Có trường chưa nhập!");
  }
  const dataPost = {
    userId: req.user.id,
    postId,
    type,
  };
  const favorite = await Favorite.create(dataPost);
  const result = dataToDto(favorite);

  res.status(201).json({
    message: "Tương tác thành công",
    favorite: result,
  });
});

// @desc update favorite
// @route  PUT '/:id'
// @access public
const updateFavorite = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const favorite = await Favorite.findById(id);
  if (!favorite) {
    res.status(404);
    throw new Error("Khoong tim thay luot tuong tac!");
  }
  const { type } = req.body;
  if (!type) {
    res.status(400);
    throw new Error("Có trường chưa nhập!");
  }
  const dataUpdate = {
    ...favorite,
    type,
  };
  const updated = await Favorite.findByIdAndUpdate(id, dataUpdate, {
    new: true,
  });
  const result = dataToDto(updated);
  res.status(201).json({
    message: "Cập nhật thành công",
    favorite: result,
  });
});

// @desc checkExisted favorite
// @route  GET /Favorites/checkExist?userId=${userId}&postId=${postId}
// @access public
const checkExistedFavorite = asyncHandler(async (req, res) => {
  const { userId, postId } = req.params;
  const favExisted = await Favorite.findOne({ userId, postId });
  if (!favExisted) {
    res.status(404);
    throw new Error("Không tìm thấy lượt tương tác!");
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
