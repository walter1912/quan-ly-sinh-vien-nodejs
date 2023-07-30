const asyncHandler = require("express-async-handler");
const Khoa = require("../models/Khoa");

// @desc lấy danh sách khoa
// @route  GET /
// @access public
const getKhoas = asyncHandler(async (req, res) => {
  const khoas = await Khoa.find();
  res.status(200).json({
    message: "lấy danh sách khoa",
    khoas,
  });
});

// @desc chi tiết khoa
// @route  GET /:id
// @access public
const getKhoaById = asyncHandler(async (req, res) => {
  const khoa = await Khoa.findById(req.params.id);
  if (!khoa) {
    res.status(404);
    throw new Error("Không tìm thấy khoa");
  }
  res.status(200).json({
    message: "chi tiết khoa",
    khoa,
  });
});

// @desc tạo khoa
// @route  POST /
// @access private
const createKhoa = asyncHandler(async (req, res) => {
  const { ten } = req.body;

  if (!ten) {
    res.status(400);
    throw new Error("Cần phải điền vào tất cả các field");
  }
  const khoa = await Khoa.create({
    userId: req.user.id,
    ten,
  });
  res.status(201).json({
    message: "tạo khoa",
    khoa,
  });
});

// @desc chỉnh sửa khoa
// @route  UPDATE /:id
// @access private
const updateKhoa = asyncHandler(async (req, res) => {
  const khoa = await Khoa.findById(req.params.id);
  if (!khoa) {
    res.status(404);
    throw new Error("Không tìm thấy khoa");
  }
  const dataUpdate = {
    ...khoa,
    ten: req.body.ten,
  };
  const khoaUpdated = await Khoa.findByIdAndUpdate(req.params.id, dataUpdate);
  res.status(201).json({
    message: "chỉnh sửa  khoa",
    khoa: khoaUpdated,
  });
});

// @desc xóa khoa
// @route  DELETE /:id
// @access private
const deleteKhoa = asyncHandler(async (req, res) => {
  const khoa = await Khoa.findById(req.params.id);
  if (!khoa) {
    res.status(404);
    throw new Error("Không tìm thấy khoa");
  }
  const deleted = await Khoa.findByIdAndRemove(req.params.id);
  res.status(201).json({
    message: "xóa khoa",
    khoa: deleted,
  });
});

module.exports = {
  getKhoas,
  getKhoaById,
  createKhoa,
  updateKhoa,
  deleteKhoa,
};
