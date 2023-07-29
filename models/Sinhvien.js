const mongoose = require("mongoose");
const User = require("./User");

const sinhvienSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    tenSV: {
      type: String,
      required: [true, "Vui lòng nhập tên sinh viên"],
    },
    maSV: {
      type: String,
      required: [true, "Vui lòng nhập mã sinh viên"],
    },
    ngaySinh: {
      type: String,
      // required: [true, "Vui lòng nhập ngày sinh"]
    },
    gioiTinh: {
      type: String,
      // required: [true, "Vui lòng chọn giới tính"]
    },
    khoaId: {
      type: Number,
    },
    tenKhoa: {
      type: String,
      // required: [true, "Vui lòng chọn khoa sinh viên"]
    },
    giangVienId: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sinhvien", sinhvienSchema);
