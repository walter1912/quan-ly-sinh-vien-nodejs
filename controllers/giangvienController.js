const asyncHandler = require("express-async-handler");
const Giangvien = require("../models/Giangvien");
const Khoa = require("../models/Khoa");
const User = require("../models/User");

// @desc lấy danh sách giảng viên
// @route  GET /
// @access public
const getGiangviens = asyncHandler(async (req, res) => {
  const giangviens = await Giangvien.find();
  if (!giangviens) {
    res.status(404);
    throw new Error("Không tìm thấy giảng viên!");
  }
  const result = giangviens.map((gv) => dataToDto(gv));
  let message = "Lấy tất cả giảng viên thành công";
  if (result.length < 1) {
    message = "Danh sách giảng viên rỗng!";
  }
  res.status(200).json({
    message,
    giangviens: result,
  });
});
// @desc lấy danh sách giảng viên theo khoa
// @route  GET /khoa/:khoaId
// @access public
const getGiangviensByKhoa = asyncHandler(async (req, res) => {
  const { khoaId } = req.params;
  const giangviens = await Giangvien.find({ khoaId });
  if (!giangviens) {
    res.status(404);
    throw new Error("Không tìm thấy giảng viên!");
  }
  const result = giangviens.map((gv) => dataToDto(gv));
  const khoa = await Khoa.findById(khoaId);
  let message = `Lấy các giảng viên của khoa ${khoa.ten} thành công`;
  if (result.length < 1) {
    message = `Khoa ${khoa.ten} hiện tại chưa có giảng viên nào!`;
  }
  res.status(200).json({
    message,
    giangviens: result,
  });
});

// @desc lấy danh sách giảng viên mà người dùng có userId tạo
// @route  GET /user/:userId
// @access public
const getGiangviensByUser = asyncHandler(async (req, res) => {
  let { userId } = req.params;
  const giangviens = await Giangvien.find({ userId });

  if (!giangviens) {
    res.status(404);
    throw new Error("Không tìm thấy giảng viên!");
  }
  const result = giangviens.map((gv) => dataToDto(gv));
  const user = await User.findById(userId);
  let message = `Lấy các giảng viên do ${user.username} tạo thành công`;
  if (result.length < 1) {
    message = `${user.username} hiện tại chưa tạo giảng viên nào!`;
  }
  res.status(200).json({
    message,
    giangviens: result,
  });
});

// @desc lấy giảng viên có maGV
// @route  GET /maGV/:maGV
// @access public
const getGiangvienByMaGV = asyncHandler(async (req, res) => {
  let { maGV } = req.params;
  const giangvien = await Giangvien.findOne({ maGV });
  if (!giangvien) {
    res.status(404);
    throw new Error(`Không tìm thấy giảng viên có mã ${maGV}!`);
  }
  const result = dataToDto(giangvien);
  res.status(200).json({
    message: `Lấy thành công thông tin giảng viên có mã ${maGV}`,
    giangvien: result,
  });
});

// @desc lấy giảng viên có id
// @route  GET /:id
// @access public
const getGiangvienById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const giangvien = await Giangvien.findById(id);
  if (!giangvien) {
    res.status(404);
    throw new Error("Không tìm thấy giảng viên!");
  }
  const result = dataToDto(giangvien);
  res.status(200).json({
    message: `Lấy thành công thông tin giảng viên ${giangvien.tenGV}`,
    giangvien: result,
  });
});

// @desc tạo giảng viên
// @route POST /
// @access private
const createGiangvien = asyncHandler(async (req, res) => {
  const { tenGV, maGV, ngaySinh, gioiTinh, khoaId } = req.body;
  if (!tenGV || !maGV || !ngaySinh || !gioiTinh || !khoaId) {
    res.status(400);
    throw new Error("Cần phải điền vào tất cả các trường!");
  }
  const maExisted = await Giangvien.findOne({ maGV });
  if (maExisted) {
    res.status(400);
    throw new Error("Mã giảng viên bị trùng!");
  }
  const giangvien = await Giangvien.create({
    userId: req.user.id,
    tenGV,
    maGV,
    ngaySinh,
    gioiTinh,
    khoaId,
  });
  const result = dataToDto(giangvien);
  res.status(201).json({
    message: `Tạo thành công giảng viên ${giangvien.tenGV}`,
    giangvien: result,
  });
});

// @desc chỉnh sửa giảng viên
// @route PUT /:id
// @access private
const updateGiangvien = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const giangvien = await Giangvien.findById(id);
  if (!giangvien) {
    res.status(404);
    throw new Error("Không tìm thấy giảng viên!");
  }
  const result = dataToDto(giangvien);
  // không được chỉnh sửa mã giảng viên
  const { maGV } = req.body;
  let mes = "";
  
  if (maGV && maGV !== giangvien.maGV) {
    mes = ", không được thay đổi mã giảng viên";
  }
  const dataUpdate = {
    ...result,
    ...req.body,
    maGV: result.maGV,
  };
  const updated = await Giangvien.findByIdAndUpdate(id, dataUpdate, {
    new: true,
  });
  res.status(200).json({
    message: ` Chỉnh sửa thông tin giảng viên ${giangvien.tenGV} thành công ${mes}`,
    giangvien: updated,
  });
});

// @desc xoa giang vien
// @route DELETE /:id
// @access private
const deleteGiangvien = asyncHandler(async (req, res) => {
  const { id } = res.params;
  const giangvien = await Giangvien.findById(id);
  if (!giangvien) {
    res.status(404);
    throw new Error("Không tìm thấy giảng viên!");
  }
  const deleted = await Giangvien.findByIdAndRemove(id);
  res.status(200).json({
    message: "Xoá thành công giảng viên",
    giangvien: deleted,
  });
});

function dataToDto(ele) {
  const {
    userId,
    tenGV,
    maGV,
    ngaySinh,
    gioiTinh,
    khoaId,
    createAt,
    updateAt,
  } = ele;
  var dto = {
    id: ele.id,
    userId,
    tenGV,
    maGV,
    ngaySinh,
    gioiTinh,
    khoaId,
    createAt,
    updateAt,
  };
  return dto;
}
module.exports = {
  getGiangviens,
  getGiangviensByKhoa,
  getGiangviensByUser,
  getGiangvienByMaGV,
  getGiangvienById,
  createGiangvien,
  updateGiangvien,
  deleteGiangvien,
};
