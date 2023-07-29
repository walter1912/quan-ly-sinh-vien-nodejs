const express = require("express");

const routes = express.Router();
const {
    getSinhviens,
    createSinhvien,
    getSinhvien,
    updateSinhvien,
    deleteSinhvien,
  } = require('../controllers/sinhvienController');
const validateToken = require("../middleware/validateTokenHandler");


routes.use(validateToken);

routes.route("/").get(getSinhviens);

routes.route("/").post(createSinhvien);

routes.route("/:id").get(getSinhvien);

routes.route("/:id").put(updateSinhvien);

routes.route("/:id").delete(deleteSinhvien);

module.exports = routes;