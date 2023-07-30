const { default: mongoose } = require("mongoose");

const postSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    thumbnail: {
      type: String,
      required: [true, "Vui lòng chọn ảnh bìa"],
    },
    title: {
      type: String,
      required: [true, "Vui lòng nhập tiêu đề bài viết"],
    },
    content: {
      type: String,
      required: [true, "Bài viết chưa có nội dung"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
