const mongoose = require("mongoose");

const giangvienSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tenGV: {
    type: String,
    required: [true, "Vui lòng nhập tên giảng viên"],
  },
  maGV: {
    type: String,
    required: [true, "Vui lòng nhập mã giảng viên"],
  },
  ngaySinh: {
    type: String,
    required: [true, "Vui lòng nhập ngày sinh"]
  },
  gioiTinh: {
    type: String,
    required: [true, "Vui lòng chọn giới tính"]
  },
  khoaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Khoa",
  },
}, {
    timestamps: true
});
module.exports = mongoose.model("Giangvien", giangvienSchema)
