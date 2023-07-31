const mongoose = require("mongoose");


const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Bạn phải điền username"],
      unique: [true, "Username không được trùng nhau"],
    },
    password: {
      type: String,
      required: [true, "Bạn phải điền username"],
    },
    role: {
      type: Number,
      required: [true, "Bạn là học sinh hay giảng viên"],
    },
    email: {
      type: String,
      // match: [
      //   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      //   "Email không hợp lệ",
      // ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
