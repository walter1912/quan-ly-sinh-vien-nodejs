const mongoose = require("mongoose");

const sinhvienSchema = mongoose.Schema(
  {
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
      required: [true, "Vui lòng nhập ngày sinh"]
    },
    gioiTinh: {
      type: String,
      required: [true, "Vui lòng chọn giới tính"]
    },
    khoaId: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "Khoa",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sinhvien", sinhvienSchema);
