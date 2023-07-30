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
    giangVienId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Giangvien",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sinhvien", sinhvienSchema);
