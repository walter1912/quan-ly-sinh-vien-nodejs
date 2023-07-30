const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const { checkAdmin, checkSameUser } = require("../middleware/checkRole");
const {
  getGiangviens,
  getGiangviensByKhoa,
  getGiangviensByUser,
  getGiangvienByMaGV,
  getGiangvienById,
  createGiangvien,
  updateGiangvien,
  deleteGiangvien,
} = require("../controllers/giangvienController");
const routes = express.Router();

routes.use(validateToken);

// + get '/'
// : lấy danh sách giảng viên
routes.route("/").get(getGiangviens);
// + get '/khoa/:khoaId'
// : lấy danh sách giảng viên theo khoa
routes.route("/khoa/:khoaId").get(getGiangviensByKhoa);
// + get '/user/:userId'
// : lấy danh sách giảng viên mà người dùng có userId tạo
routes.route("/user/:userId").get(getGiangviensByUser);
// + get '/maGV/:maGV'
// : lấy giảng viên có maGV
routes.route("/maGV/:maGV").get(getGiangvienByMaGV);
// + get '/:id'
// : lấy giảng viên có id
routes.route("/:id").get(getGiangvienById);

// - post '/':
// (
//     admin mới vào được
// )
routes.route("/").post(checkAdmin, createGiangvien);
// - put '/:id':
//  (
//     admin và giảng viên đó mới vào được
// )
routes.route("/:id").put(checkSameUser, updateGiangvien);
// - delete '/:id':
//  (
//     admin mới vào được
// )
routes.route("/:id").delete(checkAdmin, deleteGiangvien);

module.exports = routes;
