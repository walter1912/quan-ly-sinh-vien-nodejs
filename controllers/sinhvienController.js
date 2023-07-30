const asyncHandler = require("express-async-handler");
const Sinhvien = require("../models/Sinhvien");
// @desc
// @route GET api/sinhviens
// @access private
const getSinhviens = asyncHandler(async (req, res) => {
  const sinhviens = await Sinhvien.find();
  res
    .status(200)
    .json({ message: `Get all sinh viên bởi ${req.user.username}`, sinhviens });
});

// @desc
// @route POST api/sinhviens
// @access private
const createSinhvien = asyncHandler(async (req, res) => {
  console.log("Request body: ", req.body);
  const { tenSV, maSV, ngaySinh, gioiTinh } = req.body;
  if (!tenSV || !maSV || !ngaySinh || !gioiTinh) {
    res.status(400);
    throw new Error("Cần phải điền vào tất cả các field");
  }
  const sinhvien = await Sinhvien.create({
    userId: req.user.id,
    tenSV,
    maSV,
    ngaySinh,
    gioiTinh,
  });
  res
    .status(201)
    .json({ message: `Post sinh viên bởi ${req.user.username}`, sinhvien });
});
// @desc
// @route GET api/sinhviens/:id
// @access private
const getSinhvien = asyncHandler(async (req, res) => {
  const sinhvien = await Sinhvien.findById(req.params.id);
  if (!sinhvien) {
    res.status(404);
    throw new Error("Sinh viên not found");
  }
  res
    .status(200)
    .json({ message: `Get sinh viên có id = ${req.params.id}`, sinhvien });
});
// @desc
// @route PUT api/sinhviens/:id
// @access private
const updateSinhvien = asyncHandler(async (req, res) => {
  const sinhvienExisted = await Sinhvien.findById(req.params.id);
  if (!sinhvienExisted) {
    res.status(404);
    throw new Error("Sinh viên not found");
  }
  // check xem co duoc cap nhat hay khong
  let kt = sinhvienExisted.userId == req.user.id;
  let who = "no one";
  if (kt === false) {
    kt = sinhvienExisted.maSV == req.user.username;
    if (kt === false) {
      console.log("kt = false => checkAdmin");
      if (req.user.role !== 1912 || req.user.username !== "eimron") {
        res.status(401);
        throw new Error("Hành động nguy hiểm, bạn không truy cập được");
      }
      who = `admin updating`;
    } else {
      who = `sinhvien  ${sinhvienExisted.tenSV} updating`;
    }
  } else {
    who = `user  ${req.user.username} updating`;
  }
  const { tenSV, maSV, ngaySinh, gioiTinh } = req.body;
  const dataUpdate = {
    userId: sinhvienExisted.userId,
    tenSV,
    maSV,
    ngaySinh,
    gioiTinh,
  };
  const updated = await Sinhvien.findByIdAndUpdate(req.params.id, dataUpdate, {
    new: true,
  });
  res.status(201).json({
    message: `Update sinh viên có id = ${req.params.id} bởi ${req.user.username} , ${who}`,
    sinhvien: updated,
  });
});
// @desc
// @route DELETE api/sinhviens/:id
// @access private
const deleteSinhvien = asyncHandler(async (req, res) => {
  const sinhvien = await Sinhvien.findById(req.params.id);
  if (!sinhvien) {
    res.status(404);
    throw new Error("Sinh viên not found");
  }

  await Sinhvien.findByIdAndRemove(req.params.id);
  res
    .status(200)
    .json({
      message: `Delete sinh viên có id = ${req.params.id} bởi ${req.user.username}`,
    });
});

// @desc lấy danh sách sinh viên theo khoa
// @route GET /khoa/:khoaId
// @access public
const getSinhviensByKhoa = asyncHandler(async (req, res) => {
  const khoaId = req.params.khoaId;
  const sinhviens = await Sinhvien.find({ khoaId });
  res
    .status(200)
    .json({ message: "lấy danh sách sinh viên theo khoa", sinhviens });
});

// @desc lấy danh sách sinh viên theo giang vien
// @route GET /user/:userId
// @access public
const getSinhviensByUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const sinhviens = await Sinhvien.find({ userId });
  res
    .status(200)
    .json({ message: "lấy danh sách sinh viên theo giảng viên", sinhviens });
});
// @desc lấy sinh viên có maSV
// @route GET /maSV/:maSV
// @access public
const getSinhviensByMaSV = asyncHandler(async (req, res) => {
  const maSV = req.params.maSV;
  const sinhvien = await Sinhvien.findOne({ maSV });
  res.status(200).json({ message: "lấy sinh viên có maSV", sinhvien });
});

module.exports = {
  getSinhviens,
  createSinhvien,
  getSinhvien,
  updateSinhvien,
  deleteSinhvien,
  getSinhviensByKhoa,
  getSinhviensByUser,
  getSinhviensByMaSV,
};
