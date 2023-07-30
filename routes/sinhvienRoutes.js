const express = require("express");

const routes = express.Router();
const {
  getSinhviens,
  createSinhvien,
  getSinhvien,
  updateSinhvien,
  deleteSinhvien,
  getSinhviensByKhoa,
  getSinhviensByGiangVien,
  getSinhviensByMaSV,
} = require("../controllers/sinhvienController");
const validateToken = require("../middleware/validateTokenHandler");
const { checkAuthen, checkAdmin } = require("../middleware/checkRole");

routes.use(validateToken);

// + get '/': lấy danh sách sinh viên
routes.route("/").get(getSinhviens);

// - post '/': tạo mới sinh viên
routes.route("/").post(validateToken, createSinhvien);

// - get '/:id': lấy sinh viên có id
routes.route("/:id").get(getSinhvien);

// - put '/:id': cập nhật sinh viên - cập nhật sinh viên
routes.route("/:id").put(checkAuthen, updateSinhvien);

// - delete '/:id': xóa sinh viên có id
routes.route("/:id").delete(checkAdmin, deleteSinhvien);

// + get '/khoa/:khoaId': lấy danh sách sinh viên theo khoa
routes.route("/khoa/:khoaId").get(getSinhviensByKhoa);
// + get '/gianvien/:giangvienId': lấy danh sách sinh viên mà người dùng có giangvienId tạo
routes.route("/gianvien/:giangvienId").get(getSinhviensByGiangVien);
// - get '/maSV/:maSV': lấy sinh viên có maSV
routes.route("/maSV/:maSV").get(getSinhviensByMaSV);

module.exports = routes;
