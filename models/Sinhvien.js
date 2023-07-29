const mongoose = require("mongoose");

const sinhvienSchema = mongoose.Schema({
//   id: {
//     type: Number,
//   },
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
}, {
    timestamps: true
}

);

module.exports = mongoose.model('Sinhvien', sinhvienSchema);