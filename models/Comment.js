const { default: mongoose } = require("mongoose");

//id của comment mà mình rep, trường hợp bình luận đầu tiên thì id = 0
// để tránh trường hợp nhầm là rep comment khác.
// nội dung comment chỉ dùng text;
//dùng textArea
// thời gian tạo comment, sẽ đc tạo trong comment services
//level của user cmt, level = 0 là người cmt đầu tiên, level = 1 là user cmt level = 0, ...

const commentSchema = mongoose.Schema(
  {
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
    repCommentId: {
      type: String,
      // ref: "Comment",
    },
    content: {
      type: String,
      required: [true, "Nội dung comment không được để trống"],
    },
    level: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
