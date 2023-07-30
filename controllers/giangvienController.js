const asyncHandler = require("express-async-handler");
const Giangvien = require("../models/Giangvien");

// @desc lấy danh sách giảng viên
// @route  GET /
// @access public
const getGiangviens = asyncHandler(async (req, res) => {
  const giangviens = await Giangvien.find();
  res.status(200).json({
    message: "lấy danh sách giảng viên",
    giangviens,
  });
});

// @desc lấy danh sách giảng viên theo khoa
// @route  GET /khoa/:khoaId
// @access public
const getGiangviensByKhoa = asyncHandler(async (req, res) => {
  let khoaId = res.params.khoaId;
  const giangviens = await Giangvien.find({ khoaId });
  res.status(200).json({
    message: "lấy danh sách giảng viên theo khoa",
    giangviens,
  });
});

// @desc lấy danh sách giảng viên mà người dùng có userId tạo
// @route  GET /user/:userId
// @access public
const getGiangviensByUser = asyncHandler(async (req, res) => {
  let userId = res.params.userId;
  const giangviens = await Giangvien.find({ userId });
  res.status(200).json({
    message: "lấy danh sách giảng viên theo user",
    giangviens,
  });
});

// @desc lấy giảng viên có maGV
// @route  GET /maGV/:maGV
// @access public
const getGiangvienByMaGV = asyncHandler(async (req, res) => {
  let maGV = res.params.maGV;
  const giangvien = await Giangvien.findOne({ maGV });
  res.status(200).json({
    message: "lấy giảng viên có maGV",
    giangvien,
  });
});

// @desc lấy giảng viên có id
// @route  GET /:id
// @access public
const getGiangvienById = asyncHandler(async (req, res) => {
  const giangvien = await Giangvien.findById(res.params.id);
  if (!giangvien) {
    res.status(404);
    throw new Error("Không tìm thấy giảng viên");
  }
  res.status(200).json({
    message: "lấy giảng viên theo id",
    giangvien,
  });
});

// @desc tạo giảng viên
// @route GET /maSV/:maSV
// @access private
const createGiangvien = asyncHandler(async (req, res) => {
  const { userId, tenGV, maGV, ngaySinh, gioiTinh, khoaId } = req.body;
  if (!userId || !tenGV || !maGV || !ngaySinh || !gioiTinh || !khoaId) {
    res.status(400);
    throw new Error("Cần phải điền vào tất cả các field");
  }
  const giangvien = await Giangvien.create({
    userId,
    tenGV,
    maGV,
    ngaySinh,
    gioiTinh,
    khoaId,
  });
  res.status(201).json({
    message: "tạo giảng viên",
    giangvien,
  });
});

// @desc chỉnh sửa giảng viên
// @route GET /maSV/:maSV
// @access private
const updateGiangvien = asyncHandler(async (req, res) => {
  const giangvien = await Giangvien.findById(req.params.id);
  if (!giangvien) {
    res.status(404);
    throw new Error("Giang vien not found");
  }
  const dataUpdate = {
    ...giangvien,
    ...req.body,
  };
  const updated = await Giangvien.findByIdAndUpdate(req.params.id, dataUpdate);
  res.status(201).json({
    message: "chỉnh sửa giảng viên",
    giangvien: updated,
  });
});

// @desc xoa giang vien
// @route GET /maSV/:maSV
// @access private
const deleteGiangvien = asyncHandler(async (req, res) => {
  const giangvien = await Giangvien.findById(req.params.id);
  if (!giangvien) {
    res.status(404);
    throw new Error("Giang vien not found");
  }

  const deleted = await Giangvien.findByIdAndRemove(req.params.id);
  res.status(201).json({
    message: "xóa giảng viên",
    deleted,
  });
});

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
