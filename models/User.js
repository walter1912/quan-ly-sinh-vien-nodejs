const mongoose = require("mongoose");

// id: number;
// username: string;
// password: string;
// role: number;
// ten: string;
// ma: string;
// ngaySinh: any;
// gioiTinh: string;
// khoaId: number;
// email: string;
// 1 với giảng viên, 2 với sinh viên


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
      unique: [true, "Email đã được sử dụng"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email không hợp lệ",
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
