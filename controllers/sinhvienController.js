const asyncHandler = require("express-async-handler");
const Sinhvien = require("../models/Sinhvien");
// @desc
// @route GET api/sinhvien
// @access private
const getSinhviens = asyncHandler(async (req, res) => {
  const sinhviens = await Sinhvien.find();
  res.status(200).json({ message: "Get all sinh viên", sinhviens });
});

// @desc
// @route POST api/sinhvien
// @access private
const createSinhvien = asyncHandler(async (req, res) => {
  console.log("Request body: ", req.body);
  const { tenSV, maSV } = req.body;
  if (!tenSV || !maSV) {
    res.status(400);
    throw new Error("Cần phải điền vào tất cả các field");
  }
  const sinhvien = await Sinhvien.create({
    user_id: req.user.id,
    tenSV,
    maSV,
  });
  res.status(201).json({ message: "Post sinh viên", sinhvien });
});
// @desc
// @route GET api/sinhvien/:id
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
// @route PUT api/sinhvien/:id
// @access private
const updateSinhvien = asyncHandler(async (req, res) => {
  const sinhvien = await Sinhvien.findById(req.params.id);
  if (!sinhvien) {
    res.status(404);
    throw new Error("Sinh viên not found");
  }
  const dataUpdate = {
    user_id: req.user.id,
    ...req.body,
  };
  const updated = await Sinhvien.findByIdAndUpdate(req.params.id, dataUpdate, {
    new: true,
  });
  res
    .status(201)
    .json({ message: `Update sinh viên có id = ${req.params.id}`, updated });
});
// @desc
// @route DELETE api/sinhvien/:id
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
    .json({ message: `Delete sinh viên có id = ${req.params.id}` });
});

module.exports = {
  getSinhviens,
  createSinhvien,
  getSinhvien,
  updateSinhvien,
  deleteSinhvien,
};
