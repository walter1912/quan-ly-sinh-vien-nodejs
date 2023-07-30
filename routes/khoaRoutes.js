const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const { checkAdmin } = require("../middleware/checkRole");
const {
  getKhoas,
  getKhoaById,
  createKhoa,
  updateKhoa,
  deleteKhoa,
} = require("../controllers/khoaConttroller");

const routes = express.Router();

routes.use(validateToken);
// + get '/': lây danh sách khoa
routes.route("/").get(getKhoas);
// + get '/:id': chi tiết khoa
routes.route("/:id").get(getKhoaById);
//    (
//     admin mới vào được post, put, delete
// )
routes.route("/").post(checkAdmin, createKhoa);
routes.route("/:id").put(checkAdmin, updateKhoa);
routes.route("/:id").delete(checkAdmin, deleteKhoa);

module.exports = routes
