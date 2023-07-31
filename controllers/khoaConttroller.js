const asyncHandler = require("express-async-handler");
const Khoa = require("../models/Khoa");

// @desc lấy danh sách khoa
// @route  GET /
// @access public
const getKhoas = asyncHandler(async (req, res) => {
  const khoas = await Khoa.find();
  if (!khoas) {
    res.status(404);
    throw new Error("Không tìm thấy khoa!");
  }
  const result = khoas.map((k) => dataToDto(k));
  let message = "Lấy tất cả khoa thành công";
  if (result.length < 1) {
    message = "Danh sách khoa rỗng!";
  }
  res.status(200).json({
    message,
    khoas: result,
  });
});

// @desc chi tiết khoa
// @route  GET /:id
// @access public
const getKhoaById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const khoa = await Khoa.findById(id);
  if (!khoa) {
    res.status(404);
    throw new Error("Không tìm thấy khoa!");
  }
  const result = dataToDto(khoa);
  res.status(200).json({
    message: `Lấy thành công thông tin khoa ${khoa.ten}`,
    khoa: result,
  });
});

// @desc tạo khoa
// @route  POST /
// @access private
const createKhoa = asyncHandler(async (req, res) => {
  const { ten } = req.body;

  if (!ten) {
    res.status(400);
    throw new Error("Cần phải điền tên khoa!");
  }
  const khoa = await Khoa.create({
    userId: req.user.id,
    ten,
  });
  const result = dataToDto(khoa);

  res.status(201).json({
    message: `Tạo thành công khoa ${ten}`,
    khoa: result,
  });
});

// @desc chỉnh sửa khoa
// @route  UPDATE /:id
// @access private
const updateKhoa = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const khoa = await Khoa.findById(id);
  if (!khoa) {
    res.status(404);
    throw new Error("Không tìm thấy khoa!");
  }
  const dataUpdate = {
    ...khoa,
    ten: req.body.ten,
  };
  const updated = await Khoa.findByIdAndUpdate(id, dataUpdate, { new: true });
  const result = dataToDto(updated);
  res.status(200).json({
    message: `Chỉnh sửa khoa ${khoa.ten} thành công`,
    khoa: result,
  });
});

// @desc xóa khoa
// @route  DELETE /:id
// @access private
const deleteKhoa = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const khoa = await Khoa.findById(id);
  if (!khoa) {
    res.status(404);
    throw new Error("Không tìm thấy khoa");
  }
  const deleted = await Khoa.findByIdAndRemove(id);
  const result = dataToDto(deleted);
  res.status(200).json({
    message:  `Xóa khoa ${khoa.ten} thành công`,
    khoa: result,
  });
});
function dataToDto(ele) {
  const { ten } = ele;
  const dto = { id: ele.id, ten };
  return dto;
}
module.exports = {
  getKhoas,
  getKhoaById,
  createKhoa,
  updateKhoa,
  deleteKhoa,
};
