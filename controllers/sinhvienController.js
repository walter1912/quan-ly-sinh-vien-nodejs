const asyncHandler = require("express-async-handler");
const Sinhvien = require("../models/Sinhvien");
// @desc
// @route GET api/sinhvien
// @access public
const getSinhviens = asyncHandler(async (req, res) => {
  const sinhviens = await Sinhvien.find();
  res.status(200).json({ message: "Get all sinh viên" , sinhviens});
});

// @desc
// @route POST api/sinhvien
// @access public
const createSinhvien = asyncHandler(async (req, res) => {
  console.log("Request body: ", req.body);
  const { tenSV, maSV } = req.body;
  if (!tenSV || !maSV) {
    res.status(400);
    throw new Error("Cần phải điền vào tất cả các field");
  }
  const sinhvien = await Sinhvien.create({
    tenSV, maSV
  })
  res.status(201).json({ message: "Post sinh viên" , sinhvien});
});
// @desc
// @route GET api/sinhvien/:id
// @access public
const getSinhvien = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Get sinh viên có id = ${req.params.id}` });
});
// @desc
// @route PUT api/sinhvien/:id
// @access public
const updateSinhvien = asyncHandler(async (req, res) => {
  res
    .status(201)
    .json({ message: `Update sinh viên có id = ${req.params.id}` });
});
// @desc
// @route DELETE api/sinhvien/:id
// @access public
const deleteSinhvien = asyncHandler(async (req, res) => {
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
