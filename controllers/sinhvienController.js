const asyncHandler = require("express-async-handler");
const Sinhvien = require("../models/Sinhvien");
const Khoa = require("../models/Khoa");
const User = require("../models/User");
// @desc
// @route GET api/sinhviens
// @access private
const getSinhviens = asyncHandler(async (req, res) => {
  const sinhviens = await Sinhvien.find();
  if (!sinhviens) {
    res.status(404);
    throw new Error("Không tìm thấy sinh viên!");
  }
  const result = sinhviens.map((sv) => dataToDto(sv));
  let message = "Lấy tất cả sinh viên thành công";
  if (result.length < 1) {
    message = "Danh sách sinh viên rỗng!";
  }
  res.status(200).json({
    message,
    sinhviens: result,
  });
});

// @desc
// @route POST api/sinhviens
// @access private
const createSinhvien = asyncHandler(async (req, res) => {
  const { tenSV, maSV, ngaySinh, gioiTinh, khoaId } = req.body;
  if (!tenSV || !maSV || !ngaySinh || !gioiTinh || !khoaId) {
    res.status(400);
    throw new Error("Cần phải điền vào tất cả các trường!");
  }
  const maExisted = await Sinhvien.findOne({ maSV });
  if (maExisted) {
    res.status(400);
    throw new Error("Mã sinh viên bị trùng!");
  }

  const sinhvien = await Sinhvien.create({
    userId: req.user.id,
    tenSV,
    maSV,
    ngaySinh,
    gioiTinh,
    khoaId,
  });
  const result = dataToDto(sinhvien);
  res.status(201).json({
    message: `Tạo thành công sinh viên ${sinhvien.tenSV}`,
    sinhvien: result,
  });
});
// @desc
// @route GET api/sinhviens/:id
// @access private
const getSinhvienById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const sinhvien = await Sinhvien.findById(id);
  if (!sinhvien) {
    res.status(404);
    throw new Error("Không tìm thấy sinh viên!");
  }
  const result = dataToDto(sinhvien);
  res.status(200).json({
    message: `Lấy thành công thông tin sinh viên ${sinhvien.tenSV}`,
    sinhvien: result,
  });
});
// @desc
// @route PUT api/sinhviens/:id
// @access private
const updateSinhvien = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const sinhvienExisted = await Sinhvien.findById(id);
  if (!sinhvienExisted) {
    res.status(404);
    throw new Error("Không tìm thấy sinh viên!");
  }
  // check xem co duoc cap nhat hay khong
  let kt = sinhvienExisted.userId == req.user.id;
  let who = "no one";
  if (kt === false) {
    kt = sinhvienExisted.maSV == req.user.username;
    if (kt === false) {
      if (req.user.role !== 1912 || req.user.username !== "eimron") {
        res.status(403);
        throw new Error("Bạn không được chỉnh sửa sinh viên này!");
      }
      who = `Admin`;
    } else {
      who = `Sinh viên  ${sinhvienExisted.tenSV}`;
    }
  } else {
    who = `${req.user.username}`;
  }
  // check mã sinh viên
  const existed = dataToDto(sinhvienExisted);
  const { maSV } = req.body;
  let mes = "";
  if (maSV && maSV !== existed.maSV) {
    mes = ", không được thay đổi mã sinh viên";
  }
  const dataUpdate = {
    ...existed,
    ...req.body,
    maSV: existed.maSV,
  };
  const updated = await Sinhvien.findByIdAndUpdate(id, dataUpdate, {
    new: true,
  });
  const result = dataToDto(updated);
  res.status(200).json({
    message: `${who} cập nhật thông tin sinh viên thành công${mes}`,
    sinhvien: result,
  });
});
// @desc
// @route DELETE api/sinhviens/:id
// @access private
const deleteSinhvien = asyncHandler(async (req, res) => {
  const {id} = req.params;
  const sinhvien = await Sinhvien.findById(id);
  if (!sinhvien) {
    res.status(404);
    throw new Error("Không tìm thấy sinh viên!");
  }

  const deleted = await Sinhvien.findByIdAndRemove(id);
  const result = dataToDto(deleted);
  res.status(200).json({
    message: `Xóa thành công sinh viên ${sinhvien.ten}`,
    sinhvien: result,
  });
});

// @desc lấy danh sách sinh viên theo khoa
// @route GET /khoa/:khoaId
// @access public
const getSinhviensByKhoa = asyncHandler(async (req, res) => {
  const { khoaId } = req.params;
  const sinhviens = await Sinhvien.find({ khoaId });
  if (!sinhviens) {
    res.status(404);
    throw new Error("Không tìm thấy sinh viên!");
  }
  const result = sinhviens.map((sv) => dataToDto(sv));
  const khoa = await Khoa.findById(khoaId);
  let message = `Lấy các sinh viên của khoa ${khoa.ten} thành công`;
  if (result.length < 1) {
    message = `Khoa ${khoa.ten} hiện tại chưa có sinh viên nào!`;
  }
  res.status(200).json({
    message,
    sinhviens: result,
  });
});

// @desc lấy danh sách sinh viên theo giang vien
// @route GET /user/:userId
// @access public
const getSinhviensByUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const sinhviens = await Sinhvien.find({ userId });
  if (!sinhviens) {
    res.status(404);
    throw new Error("Không tìm thấy sinh viên!");
  }
  const result = sinhviens.map((sv) => dataToDto(sv));
  const user = await User.findById(userId);
  let message = `Lấy các sinh viên do ${user.username} tạo thành công`;
  if (result.length < 1) {
    message = `${user.username} hiện tại chưa tạo sinh viên nào!`;
  }
  res.status(200).json({
    message,
    sinhviens: result,
  });
});
// @desc lấy sinh viên có maSV
// @route GET /maSV/:maSV
// @access public
const getSinhviensByMaSV = asyncHandler(async (req, res) => {
  let { maSV } = req.params;
  const sinhvien = await Sinhvien.findOne({ maSV });
  if (!sinhvien) {
    res.status(404);
    throw new Error(`Không tìm thấy sinh viên có mã ${maSV}!`);
  }
  const result = dataToDto(sinhvien);
  res.status(200).json({
    message: `Lấy thành công thông tin sinh viên có mã ${maSV}`,
    sinhvien: result,
  });
});

function dataToDto(ele) {
  const {
    userId,
    tenSV,
    maSV,
    ngaySinh,
    gioiTinh,
    khoaId,
    createAt,
    updateAt,
  } = ele;
  var dto = {
    id: ele.id,
    userId,
    tenSV,
    maSV,
    ngaySinh,
    gioiTinh,
    khoaId,
    createAt,
    updateAt,
  };
  return dto;
}
module.exports = {
  getSinhviens,
  createSinhvien,
  getSinhvien: getSinhvienById,
  updateSinhvien,
  deleteSinhvien,
  getSinhviensByKhoa,
  getSinhviensByUser,
  getSinhviensByMaSV,
};
