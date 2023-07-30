const { default: mongoose } = require("mongoose");

const favoriteSchema = mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Bài viết không tồn tại"],
    ref: "Post",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Người dùng comment không tồn tại"],
    ref: "User",
  },
  type: {
    // 1 là like
    //2 là unlike
    type: Number,
  },
});

module.exports = mongoose.model("Favorite", favoriteSchema);
