const express = require("express");

const routes = express.Router();
const {
  getSinhviens,
  createSinhvien,
  getSinhvien,
  updateSinhvien,
  deleteSinhvien,
  getSinhviensByKhoa,
  getSinhviensByUser,
  getSinhviensByMaSV,
} = require("../controllers/sinhvienController");
const validateToken = require("../middleware/validateTokenHandler");
const { checkAuthen } = require("../middleware/checkRole");

routes.use(validateToken);

// + get '/': lấy danh sách sinh viên
routes.route("/").get(getSinhviens);

// - post '/': tạo mới sinh viên
routes.route("/").post(checkAuthen, createSinhvien);

// + get '/:id': lấy sinh viên có id
routes.route("/:id").get(getSinhvien);

// -? put '/:id': cập nhật sinh viên - cập nhật sinh viên
// nếu không phải sinh viên đó thì mới checkAuthen
routes.route("/:id").put(updateSinhvien);

// - delete '/:id': xóa sinh viên có id
routes.route("/:id").delete(checkAuthen, deleteSinhvien);

// + get '/khoa/:khoaId': lấy danh sách sinh viên theo khoa
routes.route("/khoa/:khoaId").get(getSinhviensByKhoa);
// + get '/user/:userId': lấy danh sách sinh viên mà người dùng có userId tạo
routes.route("/user/:userId").get(getSinhviensByUser);
// + get '/maSV/:maSV': lấy sinh viên có maSV
routes.route("/maSV/:maSV").get(getSinhviensByMaSV);

module.exports = routes;
